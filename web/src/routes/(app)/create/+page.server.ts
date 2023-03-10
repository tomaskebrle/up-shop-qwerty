import { z } from 'zod';
import { zfd } from 'zod-form-data';
import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { date_to_pocketbase, get_date_from_ddmmyyyy } from '@utils/dates';

export const actions: Actions = {
	default: async ({ locals, request }) => {
		const data = await request.formData();

		const parsed_date = date_to_pocketbase(get_date_from_ddmmyyyy(data.get('date') as string));
		if (parsed_date) data.set('date', parsed_date);

		data.set('user', locals.pb.authStore.model?.id as string);

		const schema = zfd.formData({
			date: z.string()
			  .refine(value => {
				return /[a-zA-Z0-9]/.test(value);
			  }, {
				message: 'Neplatné datum'
			  })
			  ,
			time: zfd.numeric(
			  z.number({ required_error: 'Neplatná délka' })
			  .min(1, 'Délka musí být větší než 0')
			  .max(1440, 'Délka nesmí být více než jeden den')
			),
			rating: zfd.numeric(
			  z.number({ required_error: 'Neplatné hodnocení' })
			  .min(0, 'Hodnocení musí být alespoň 0')
			  .max(5, 'Hodnocení nesmí být více jak 5 hvězd')
			),
			language: z.string()
			  .refine(value => {
				return /[a-zA-Z0-9]/.test(value);
			  }, {
				message: 'Špatný formát jazyku (a-z0-9)'
			  })
			  ,
			description: z.string()
			  .max(500, 'Popis nesmí být delší než 500 znaků')
		  });

		let parsed = schema.safeParse(data);

		if (!parsed.success) {
			const response = {
				errors: { ...parsed.error.flatten().fieldErrors }
			};
			console.log(response);

			return fail(400, response);
		}
		try {

					await locals.pb.collection('records').create(data, { $autoCancel: false });
		
			
		} catch (e) {
			console.log('idk', e, data, locals.pb.authStore.model?.id);
			return fail(400, {
				error: 'Nepodařilo se vytvořit záznam. Zkuste to prosím znovu.'
			});
		}

		throw redirect(303, '/');
	}
};
