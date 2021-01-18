<script>
	import {onMount} from 'svelte';

	async function addTag(tag) {
	    const res = await fetch(`/api/tag?tag=${tag}` , {method: 'post'});
	    const {id} = await res.json();
        return id;
    }

    async function getTag(id) {
        const res = await fetch(`/api/tag?id=${id}`);
        return await res.json();
    }

    async function listTags() {
        const res = await fetch('/api/tag');
        return await res.json();
    }

    async function deleteTag(id) {
        const res = await fetch(`/api/tag?id=${id}`, {method: 'delete'});
        return await res.json();
    }

	onMount(async () => {

	});


</script>

<style>
	h1 {
		color: purple;
	}
</style>

<div class="border-2 border-blue-300 bg-red-200">
    <h1>Hello world!</h1>
</div>
