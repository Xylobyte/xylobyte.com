import type { InjectionKey, Ref } from 'vue';

export const menuOpenKey = Symbol() as InjectionKey<Ref<boolean>>;
export const langKey = Symbol() as InjectionKey<Ref<string>>;
export const textsKey = Symbol() as InjectionKey<Ref<Record<string, string>>>;
