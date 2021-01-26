<script>
    import {tags, limit, page} from './stores.js';
    import {onMount} from 'svelte';
    import {listTags} from 'sql-tag-system-fetch-utils';
    import TagComponent from './TagComponent.svelte';

    onMount(async () => {
        try {
            console.log(await listTags($page, $limit))
            $tags = await listTags($page, $limit);
        } catch (err) {
            console.log(err)
        }
    });

    async function handleLoadMore() {
        const additionalTags = await listTags(++$page, $limit);
        $tags = [...$tags, ...additionalTags];
    }

</script>

<TagComponent></TagComponent>

<div class="fixed bottom-5 items-center w-screen flex justify-center items-center">
    <button class="w-48 bg-blue-300 p-1 rounded-2xl focus:outline-none" on:click={handleLoadMore}>Load More</button>
</div>

