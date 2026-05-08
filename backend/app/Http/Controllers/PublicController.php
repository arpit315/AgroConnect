<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Crop;

class PublicController extends Controller
{
    public function getLandingData()
    {
        $farmersCount = User::where('role', 'farmer')->count();
        $vendorsCount = User::where('role', 'vendor')->count();
        $citiesCount = Crop::distinct('location')->count();
        
        $recentCrops = Crop::with('farmer')->latest()->take(3)->get();

        return response()->json([
            'stats' => [
                'farmers' => $farmersCount,
                'vendors' => $vendorsCount,
                'cities' => $citiesCount,
            ],
            'recent_crops' => $recentCrops
        ]);
    }
}
