import type { HardSkills, LanguageSkill, Project, SoftSkill } from '@/assets/api/skills.ts';

export class XylobyteAPI {
	static getHardSkills = async (): Promise<HardSkills> =>
		await fetchData('https://api.xylobyte.com/v1/website/hardskills');

	static getSoftSkills = async (): Promise<SoftSkill[]> =>
		await fetchData('https://api.xylobyte.com/v1/website/softskills');

	static getLanguagesSkills = async (): Promise<LanguageSkill[]> =>
		await fetchData('https://api.xylobyte.com/v1/website/languages-skills');

	static getProjects = async (): Promise<Project[]> =>
		await fetchData('https://api.xylobyte.com/v1/website/projects');
}

const fetchData = async (url: string) => {
	const res = await fetch(url);
	if (!res.ok) throw res.statusText;
	return await res.json();
};
