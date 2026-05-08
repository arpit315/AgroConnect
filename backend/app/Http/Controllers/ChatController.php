<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Message;
use App\Models\User;

class ChatController extends Controller
{
    public function getConversations(Request $request)
    {
        $userId = $request->user()->id;

        $messages = Message::where('sender_id', $userId)
            ->orWhere('receiver_id', $userId)
            ->with(['sender', 'receiver'])
            ->latest()
            ->get();

        $conversations = collect([]);
        $seenUserIds = [];

        foreach ($messages as $message) {
            $otherUserId = $message->sender_id == $userId ? $message->receiver_id : $message->sender_id;

            if (!in_array($otherUserId, $seenUserIds)) {
                $seenUserIds[] = $otherUserId;
                $otherUser = $message->sender_id == $userId ? $message->receiver : $message->sender;
                $conversations->push([
                    'user' => $otherUser,
                    'last_message' => $message
                ]);
            }
        }

        return response()->json($conversations);
    }

    public function getMessages(Request $request, $userId)
    {
        $authId = $request->user()->id;

        // Mark as read BEFORE fetching so the response reflects the update
        Message::where('sender_id', $userId)
            ->where('receiver_id', $authId)
            ->where('is_read', false)
            ->update(['is_read' => true]);

        $messages = Message::where(function ($q) use ($authId, $userId) {
            $q->where('sender_id', $authId)->where('receiver_id', $userId);
        })
            ->orWhere(function ($q) use ($authId, $userId) {
                $q->where('sender_id', $userId)->where('receiver_id', $authId);
            })
            ->with(['sender', 'receiver'])
            ->oldest()
            ->get();

        return response()->json($messages);
    }

    public function sendMessage(Request $request)
    {
        $validated = $request->validate([
            'receiver_id' => 'required|exists:users,id',
            'content' => 'required|string',
        ]);

        $message = Message::create([
            'sender_id' => $request->user()->id,
            'receiver_id' => $validated['receiver_id'],
            'content' => $validated['content'],
            'is_read' => false,
        ]);

        return response()->json($message->load(['sender', 'receiver']), 201);
    }
}
