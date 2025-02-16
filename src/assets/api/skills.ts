interface HardSkillItem {
	name: string;
	important: boolean;
}

export interface HardSkills {
	languages: HardSkillItem[];
	frameworks: HardSkillItem[];
	tools: HardSkillItem[];
	systems: HardSkillItem[];
}

export interface SoftSkill {
	name: string;
}

export interface Project {
	id: string;
	name: string;
	shortDescription: string;
	description: string;
	logo: string;
	image: string;
	link: string;
	linkOfCode: string;
	date: string;
	skills: { name: string }[];
}

export interface LanguageSkill {
	name: string;
	level: string;
}
