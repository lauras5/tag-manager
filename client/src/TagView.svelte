<script>
    import {addTag} from "sql-tag-system-fetch-utils";
    import {faPlusCircle} from '@fortawesome/free-solid-svg-icons/faPlusCircle';
    import {faTimes} from '@fortawesome/free-solid-svg-icons/faTimes';
    import Icon from 'fa-svelte';
    import {tags} from './stores';

    let addingTag = false;
    let newTag = '';

    async function handleKeydown(event) {
        const {key} = event;

        if (key === 'Enter') {
            await handleAdd();
        } else if (key === 'Escape') {
            newTag = '';
            addingTag = false;
        }
    }

    async function handleAdd() {
        if (newTag) {
            let newTags = newTag.split(",");

            for (let tag of newTags) {
                tag = tag.trim();

                if (tag) {
                    try {
                        let newTagId = await addTag(tag);
                        $tags = [{id: newTagId, tag: tag}, ...$tags];
                    } catch (err) {
                        console.log(err);
                    }
                }
            }

            newTag = '';
            addingTag = false;
        }
    }
</script>

<svelte:window on:keydown={handleKeydown}/>

{#if addingTag}
    <div class="p-1 m-2 bg-gray-300 rounded-2xl focus:outline-none w-80 flex justify-center items-center">
        <input class="bg-gray-300 rounded-2xl focus:outline-none w-72 border-none pl-1" bind:value={newTag}
               placeholder="separate tags with commas">
        <div class="inline-flex justify-center items-center bg-gray-300 rounded-full w-6 h-6 hover:bg-gray-200"
             on:click={() => { newTag = ''; addingTag = false; }}>
            <Icon icon={faTimes}></Icon>
        </div>
    </div>
{:else}
    <div on:click={() => { addingTag = true }}
         class="flex m-2 bg-gray-300 rounded-full h-8 w-8 justify-center items-center">
        <Icon class="text-2xl" icon={faPlusCircle}></Icon>
    </div>
{/if}
