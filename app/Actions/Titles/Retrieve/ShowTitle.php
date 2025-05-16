<?php

namespace App\Actions\Titles\Retrieve;

use App\Models\Title;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;

class ShowTitle
{
    public function execute(int|string $id, array $params): array
    {
        if (defined('SHOULD_PRERENDER')) {
            $params['skipUpdating'] = true;
            $params['load'] =
                'images,genres,productionCountries,keywords,videos,primaryVideo,seasons,compactCredits';
            $params['loadCount'] = 'seasons';
        }

        if (is_numeric($id) || ctype_digit($id)) {
            $title = Title::findOrFail($id);
        } else {
            $title = Title::firstOrCreateFromEncodedTmdbId($id);
        }

        if (!Arr::get($params, 'skipUpdating')) {
            $title = $title->maybeUpdateFromExternal();
            if (!$title) {
                abort(404);
            }
        }

        $response = ['title' => $title->loadCount('seasons')];

        foreach (explode(',', Arr::get($params, 'load', '')) as $relation) {
            $methodName = sprintf('load%s', Str::camel($relation));
            if (method_exists($this, $methodName)) {
                $response = $this->$methodName($title, $params, $response);
            } elseif (method_exists($title, $relation)) {
                $title->load($relation);
            }
        }

        foreach (
            explode(',', Arr::get($params, 'loadCount', ''))
            as $relation
        ) {
            if (method_exists($title, $relation)) {
                $title->loadCount($relation);
            }
        }

        return $response;
    }
}
