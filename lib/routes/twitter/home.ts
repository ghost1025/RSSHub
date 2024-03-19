import { Route } from '@/types';
import utils from './utils';
import api from './api';

export const route: Route = {
    path: '/home/:routeParams?',
    categories: ['social-media'],
    example: '/twitter/home',
    features: {
        requireConfig: [
            {
                name: 'TWITTER_USERNAME',
                description: '',
            },
            {
                name: 'TWITTER_PASSWORD',
                description: '',
            },
            {
                name: 'TWITTER_COOKIE',
                description: '',
            },
        ],
        requirePuppeteer: false,
        antiCrawler: false,
        supportBT: false,
        supportPodcast: false,
        supportScihub: false,
    },
    name: 'Home timeline',
    maintainers: ['DIYgod'],
    handler,
};

async function handler(ctx) {
    // For compatibility
    const { count, include_rts } = utils.parseRouteParams(ctx.req.param('routeParams'));
    const params = count ? { count } : {};

    await api.init();
    let data = await api.getHomeTimeline('', params);
    if (!include_rts) {
        data = utils.excludeRetweet(data);
    }

    return {
        title: `Twitter following timeline`,
        link: `https://twitter.com/home`,
        // description: userInfo?.description,
        item: utils.ProcessFeed(ctx, {
            data,
        }),
    };
}