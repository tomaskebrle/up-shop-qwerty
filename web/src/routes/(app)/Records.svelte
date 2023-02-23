<script lang="ts">
	import { page } from '$app/stores';
	import type { PageData } from './$types';
	import { get_minute_sklonovani } from '@utils/dates';
	import { language_colors, language_names } from '@utils/languages';
	import { goto } from '$app/navigation';
	import { get_text_color } from '@utils';

	const { records } = $page.data as PageData;
</script>

<section id="data" class="my-12">
	<h2 class="text-6xl text-primary mb-4">Moje záznamy</h2>
	<!-- Each block for records -->
	<div class="overflow-x-auto">
		<table class="table w-full">
			<!-- head -->
			<thead>
				<tr>
					<th>Datum</th>
					<th>Délka</th>
					<th>Hodnocení</th>
					<th>Programovací jazyky</th>
				</tr>
			</thead>
			<tbody>
				{#each records as record (record.id)}
					<tr
						class="hover cursor-pointer"
						on:click={() => goto(`/record/${record.id}`, { noScroll: true })}
					>
						<td>{new Date(record.date).toLocaleDateString('cs')}</td>
						<td>{record.time} {get_minute_sklonovani(record.time)}</td>
						<td>{'*'.repeat(record.rating)}</td>
						<td>
							<div class="flex flex-wrap gap-1">
								{#each record.language as language}
									<div
										class="badge"
										style="background-color: {language_colors[
											language
										]}; border-color: {language_colors[language]};color: {get_text_color(
											language_colors[language]
										)};"
									>
										{language_names[language]}
									</div>
								{/each}
							</div>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</section>