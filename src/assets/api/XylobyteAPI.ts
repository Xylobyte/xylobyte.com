import type { HardSkills, LanguageSkill, Project, SoftSkill } from '@/assets/api/skills.types.ts';
import type { ContactRequestData } from '@/assets/api/contact.types.ts';

export class XylobyteAPI {
	static getHardSkills = async (): Promise<HardSkills> =>
		await fetchData('https://api.xylobyte.com/v1/website/hardskills');

	static getSoftSkills = async (): Promise<SoftSkill[]> =>
		await fetchData('https://api.xylobyte.com/v1/website/softskills');

	static getLanguagesSkills = async (): Promise<LanguageSkill[]> =>
		await fetchData('https://api.xylobyte.com/v1/website/languages-skills');

	static getProjects = async (): Promise<Project[]> =>
		await fetchData('https://api.xylobyte.com/v1/website/projects');

	static sendContactRequest = async (data: ContactRequestData) => {
		const response = await fetch('https://api.xylobyte.com/v1/website/contact', {
			body: JSON.stringify(data),
			method: 'POST',
			cache: 'no-cache',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
		});

		switch (response.status) {
			case 201:
				break;

			default:
				throw (await response.json()).message.toString();
		}
	};
}

const fetchData = async (url: string) => {
	const res = await fetch(url);
	if (!res.ok) throw res.statusText;
	return await res.json();
};
