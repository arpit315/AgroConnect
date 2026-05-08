import React, { useState, useEffect, useRef } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Send, User as UserIcon, Loader } from 'lucide-react';

const Chat = () => {
    const { user } = useAuth();
    const [conversations, setConversations] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        fetchConversations();
    }, []);

    useEffect(() => {
        let interval;
        if (selectedUser) {
            fetchMessages(selectedUser.id);
            // Polling every 3 seconds
            interval = setInterval(() => {
                fetchMessages(selectedUser.id, true);
            }, 3000);
        }
        return () => clearInterval(interval);
    }, [selectedUser]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const fetchConversations = async () => {
        try {
            const res = await api.get('/chat/conversations');
            setConversations(res.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    const fetchMessages = async (userId, silent = false) => {
        try {
            const res = await api.get(`/chat/messages/${userId}`);
            setMessages(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim() || !selectedUser) return;

        try {
            const res = await api.post('/chat/send', {
                receiver_id: selectedUser.id,
                content: newMessage
            });
            setMessages([...messages, res.data]);
            setNewMessage('');
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
            <Loader className="w-12 h-12 text-green-600 animate-spin" />
            <p className="text-gray-500 font-bold">Loading chats...</p>
        </div>
    );

    return (
        <div className="max-w-6xl mx-auto h-[80vh] flex bg-white rounded-[3rem] shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in zoom-in-95 duration-500">
            {/* Sidebar */}
            <div className="w-1/3 border-r border-gray-100 bg-gray-50 flex flex-col">
                <div className="p-6 border-b border-gray-200">
                    <h2 className="text-2xl font-black text-gray-900 tracking-tight">Messages</h2>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-2">
                    {conversations.map((conv, idx) => (
                        <div 
                            key={idx}
                            onClick={() => setSelectedUser(conv.user)}
                            className={`p-4 rounded-2xl cursor-pointer transition-all flex items-center gap-4 ${selectedUser?.id === conv.user.id ? 'bg-green-600 text-white shadow-lg' : 'hover:bg-white hover:shadow-sm text-gray-900'}`}
                        >
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg ${selectedUser?.id === conv.user.id ? 'bg-white/20' : 'bg-green-100 text-green-700'}`}>
                                {conv.user.name.charAt(0)}
                            </div>
                            <div className="overflow-hidden">
                                <h3 className="font-bold truncate">{conv.user.name}</h3>
                                <p className={`text-sm truncate ${selectedUser?.id === conv.user.id ? 'text-green-100' : 'text-gray-500'}`}>
                                    {conv.last_message.content}
                                </p>
                            </div>
                        </div>
                    ))}
                    {conversations.length === 0 && (
                        <p className="text-center text-gray-500 font-bold mt-10">No conversations yet.</p>
                    )}
                </div>
            </div>

            {/* Chat Area */}
            <div className="w-2/3 flex flex-col bg-white">
                {selectedUser ? (
                    <>
                        <div className="p-6 border-b border-gray-100 flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-green-100 text-green-700 flex items-center justify-center font-bold text-lg">
                                {selectedUser.name.charAt(0)}
                            </div>
                            <div>
                                <h3 className="text-xl font-black text-gray-900">{selectedUser.name}</h3>
                                <p className="text-sm font-bold text-gray-400 capitalize">{selectedUser.role}</p>
                            </div>
                        </div>
                        
                        <div className="flex-1 overflow-y-auto p-6 space-y-4">
                            {messages.map((msg) => {
                                const isMe = msg.sender_id === user.id;
                                return (
                                    <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-[70%] rounded-2xl p-4 ${isMe ? 'bg-green-600 text-white rounded-br-sm' : 'bg-gray-100 text-gray-900 rounded-bl-sm'}`}>
                                            <p className="font-medium">{msg.content}</p>
                                        </div>
                                    </div>
                                );
                            })}
                            <div ref={messagesEndRef} />
                        </div>

                        <div className="p-6 border-t border-gray-100 bg-gray-50">
                            <form onSubmit={sendMessage} className="flex gap-4">
                                <input 
                                    type="text" 
                                    value={newMessage}
                                    onChange={e => setNewMessage(e.target.value)}
                                    placeholder="Type your message..."
                                    className="flex-1 px-6 py-4 rounded-2xl outline-none focus:ring-2 focus:ring-green-600 transition-all border border-gray-200"
                                />
                                <button 
                                    type="submit"
                                    disabled={!newMessage.trim()}
                                    className="bg-green-600 text-white w-14 rounded-2xl flex items-center justify-center hover:bg-green-700 transition-all disabled:opacity-50 active:scale-95"
                                >
                                    <Send className="w-6 h-6" />
                                </button>
                            </form>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
                        <UserIcon className="w-20 h-20 mb-4 opacity-20" />
                        <p className="text-xl font-bold">Select a conversation to start chatting</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Chat;
