import { error } from '@sveltejs/kit';
import { actions } from '$lib/forms';
import { PREVIEW_COOKIE_KEY } from '$lib/constants';
import { fetchPage } from '$lib/content';

export const load = async ({ params, cookies, fetch }) => {
  try {
    const page = await fetchPage({
      slug: `handbook/${params.path}`,
      version: cookies.get(PREVIEW_COOKIE_KEY) ? 'draft' : 'published',
      fetch
    });

    return { page };
  } catch (err) {
    throw error(404, 'Not found');
  }
};

export { actions };
