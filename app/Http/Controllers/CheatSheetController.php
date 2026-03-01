<?php

namespace App\Http\Controllers;

use App\Services\CheatSheetDataService;
use Inertia\Inertia;
use Inertia\Response;

class CheatSheetController extends Controller
{
    public function __construct(
        private CheatSheetDataService $dataService
    ) {}

    public function index(): Response
    {
        return Inertia::render('CheatSheet/Home', [
            'pageTitle' => 'Welcome',
        ]);
    }

    public function links(): Response
    {
        return Inertia::render('CheatSheet/Links', [
            'pageTitle' => 'Links',
            'links' => $this->dataService->load('links'),
        ]);
    }

    public function characters(): Response
    {
        return Inertia::render('CheatSheet/Characters', [
            'pageTitle' => 'Umas',
            'characters' => $this->dataService->load('characters'),
        ]);
    }

    public function skills(): Response
    {
        return Inertia::render('CheatSheet/Skills', [
            'pageTitle' => 'Skills',
            'skills' => $this->dataService->load('skills'),
        ]);
    }

    public function races(): Response
    {
        return Inertia::render('CheatSheet/Races', [
            'pageTitle' => 'Races',
            'races' => $this->dataService->load('races'),
        ]);
    }

    public function builds(): Response
    {
        return Inertia::render('CheatSheet/Builds', [
            'pageTitle' => 'Support Card Builds',
            'builds' => $this->dataService->load('builds'),
        ]);
    }
}
