<?php

namespace Database\Seeders;

use App\Models\Channel;
use Common\Channels\GenerateChannelsFromConfig;
use Common\Database\Seeds\DefaultPagesSeeder;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call(WatchlistSeeder::class);
        $this->call(BillingPlanSeeder::class);
        $this->call(DefaultPagesSeeder::class);

        if (
            !config('common.site.demo') &&
            Channel::where('type', 'channel')->count() === 0
        ) {
            $homepageChannel = (new GenerateChannelsFromConfig())->execute([
                resource_path('defaults/channels/shared-channels.json'),
                resource_path('defaults/channels/default-channels.json'),
            ]);
            settings()->save([
                'homepage.type' => 'channels',
                'homepage.value' => $homepageChannel->id,
            ]);
        }
    }
}
