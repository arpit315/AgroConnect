<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Requirement;

class RequirementController extends Controller
{
    public function index(Request $request)
    {
        $requirements = Requirement::with('vendor')->latest()->get();
        return response()->json($requirements);
    }

    public function myRequirements(Request $request)
    {
        $requirements = Requirement::where('vendor_id', $request->user()->id)->latest()->get();
        return response()->json($requirements);
    }

    public function show($id)
    {
        $req = Requirement::with('vendor')->findOrFail($id);
        return response()->json($req);
    }

    public function store(Request $request)
    {
        $request->validate([
            'crop_name' => 'required|string|max:255',
            'quantity' => 'required|integer|min:1',
            'budget' => 'required|numeric|min:0',
            'location' => 'required|string',
        ]);

        $req = Requirement::create([
            'vendor_id' => $request->user()->id,
            'crop_name' => $request->crop_name,
            'quantity' => $request->quantity,
            'budget' => $request->budget,
            'location' => $request->location,
            'description' => $request->description,
        ]);

        return response()->json($req, 201);
    }

    public function update(Request $request, $id)
    {
        $req = Requirement::where('vendor_id', $request->user()->id)->findOrFail($id);
        $req->update($request->all());
        return response()->json($req);
    }

    public function destroy(Request $request, $id)
    {
        $req = Requirement::where('vendor_id', $request->user()->id)->findOrFail($id);
        $req->delete();
        return response()->json(['message' => 'Requirement deleted successfully']);
    }
}
