<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Crop;

class CropController extends Controller
{
    public function index(Request $request)
    {
        $query = Crop::with('farmer');

        if ($request->has('search')) {
            $query->where('crop_name', 'like', '%' . $request->search . '%');
        }
        if ($request->has('location')) {
            $query->where('location', 'like', '%' . $request->location . '%');
        }
        if ($request->has('min_price')) {
            $query->where('price', '>=', $request->min_price);
        }
        if ($request->has('max_price')) {
            $query->where('price', '<=', $request->max_price);
        }

        return response()->json($query->latest()->get());
    }

    public function myCrops(Request $request)
    {
        $crops = Crop::where('farmer_id', $request->user()->id)->latest()->get();
        return response()->json($crops);
    }

    public function show($id)
    {
        $crop = Crop::with('farmer')->findOrFail($id);
        return response()->json($crop);
    }

    public function store(Request $request)
    {
        $request->validate([
            'crop_name' => 'required|string|max:255',
            'quantity' => 'required|integer|min:1',
            'price' => 'required|numeric|min:0',
            'location' => 'required|string',
        ]);

        $crop = Crop::create([
            'farmer_id' => $request->user()->id,
            'crop_name' => $request->crop_name,
            'quantity' => $request->quantity,
            'price' => $request->price,
            'location' => $request->location,
            'description' => $request->description,
            'image' => $request->image,
        ]);

        return response()->json($crop, 201);
    }

    public function update(Request $request, $id)
    {
        $crop = Crop::where('farmer_id', $request->user()->id)->findOrFail($id);
        $crop->update($request->all());
        return response()->json($crop);
    }

    public function destroy(Request $request, $id)
    {
        $crop = Crop::where('farmer_id', $request->user()->id)->findOrFail($id);
        $crop->delete();
        return response()->json(['message' => 'Crop deleted successfully']);
    }
}
