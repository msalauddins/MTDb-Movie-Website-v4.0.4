<?php

namespace App\Console;

use App\Console\Commands\CleanDemoSite;
use App\Console\Commands\UpdateNewsFromRemote;
use App\Console\Commands\UpdateSeasonsFromRemote;
use Common\Channels\UpdateAllChannelsContent;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    protected $commands = [UpdateAllChannelsContent::class];

    protected function schedule(Schedule $schedule): void
    {
        if (settings('news.auto_update')) {
            $schedule->command(UpdateNewsFromRemote::class)->daily();
        }

        if (
            config('services.tmdb.key') &&
            (settings('content.force_season_update') ||
                settings('content.title_provider') === 'tmdb')
        ) {
            $schedule
                ->command(UpdateSeasonsFromRemote::class)
                ->everyFourHours();
        }

        if (config('common.site.demo')) {
            $schedule->command(CleanDemoSite::class)->daily();
        }

        $schedule->command(UpdateAllChannelsContent::class)->daily();
    }

    protected function commands(): void
    {
        $this->load(__DIR__ . '/Commands');

        require base_path('routes/console.php');
    }
}
