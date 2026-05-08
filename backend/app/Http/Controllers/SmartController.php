<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\Models\Crop;
use App\Models\Requirement;

class SmartController extends Controller
{
    public function getWeather(Request $request)
    {
        $request->validate([
            'lat' => 'required|numeric',
            'lon' => 'required|numeric',
        ]);

        $response = Http::get('https://api.open-meteo.com/v1/forecast', [
            'latitude' => $request->lat,
            'longitude' => $request->lon,
            'current_weather' => true,
        ]);

        return response()->json($response->json());
    }

    public function predictPrice(Request $request)
    {
        $request->validate([
            'crop_name' => 'required|string',
        ]);

        $cropName = strtolower($request->crop_name);
        
        $avgPrice = Crop::where('crop_name', 'like', '%' . $cropName . '%')->avg('price') ?? 50;
        
        $trend = [];
        $currentPrice = $avgPrice;
        for ($i = 0; $i < 7; $i++) {
            $variance = rand(-5, 5);
            $currentPrice += $variance;
            $trend[] = [
                'day' => now()->addDays($i)->format('M d'),
                'predicted_price' => max(1, round($currentPrice, 2))
            ];
        }

        return response()->json([
            'crop' => $cropName,
            'current_avg' => round($avgPrice, 2),
            'trend' => $trend
        ]);
    }

    public function recommendCrop(Request $request)
    {
        $request->validate([
            'temperature' => 'required|numeric',
            'soil_type' => 'required|string',
        ]);

        $temp = $request->temperature;
        $soil = strtolower($request->soil_type);

        $recommendations = [];

        if ($temp > 25 && str_contains($soil, 'clay')) {
            $recommendations = ['Rice', 'Cotton', 'Sugarcane'];
        } elseif ($temp >= 15 && $temp <= 25 && str_contains($soil, 'loam')) {
            $recommendations = ['Wheat', 'Maize', 'Soybeans'];
        } else {
            $recommendations = ['Millets', 'Sorghum', 'Barley'];
        }

        return response()->json([
            'recommended_crops' => $recommendations,
            'reasoning' => "Based on a temperature of {$temp}°C and {$soil} soil."
        ]);
    }

    public function marketTrends(Request $request)
    {
        $trends = Requirement::selectRaw('crop_name, sum(quantity) as total_demand')
            ->groupBy('crop_name')
            ->orderByDesc('total_demand')
            ->take(5)
            ->get();

        return response()->json($trends);
    }
}
