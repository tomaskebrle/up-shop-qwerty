<script lang="ts">
	import Sidebar from '@components/Sidebar.svelte';
	import { get_date_in_ddmmyyyy } from '@utils/dates';
	import { page } from '$app/stores';

	async function get_file() {
		const res = await fetch(`/backup/export/api`, {
			method: 'GET'
		});

		const filename = res.headers.get('Content-Disposition')?.split('filename=')[1];

		// convert zip file to url object (for anchor tag download)
		let blob = await res.blob();
		var url = window.URL || window.webkitURL;
		let link = url.createObjectURL(blob);

		// generate anchor tag, click it for download and then remove it again
		let a = document.createElement('a');
		a.setAttribute('download', filename ?? 'backup.csv');
		a.setAttribute('href', link);
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
	}
</script>

<Sidebar
	route="/home{$page.url.search}"
	title="Exportujte zálohu"
	description="Máte rádi jistotu?
  Tak si uložte všechny své záznamy v podobě CSV souboru!
  Kdykoliv si budete chtít své záznamy stáhnout, stačí jednoduše kliknout na tlačítko Exportovat zálohu a vaše záznamy se uloží na váš počítač.
  Pokud budete chtít své záznamy později importovat zpět do aplikace, stačí kliknout na tlačítko Importovat zálohu a budete moci snadno obnovit veškeré své záznamy."
>
	<button type="button" on:click={get_file} class="btn w-full">Exportovat zálohu</button>
</Sidebar>
