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
	logo?: string;
	images: string[];
	link: string | null;
	linkOfCode: string | null;
	date: string;
	skills: { name: string }[];
	featured?: boolean;
	type?: 'perso' | 'pro' | 'school';
}

export interface LanguageSkill {
	name: string;
	level: string;
}
