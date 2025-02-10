import type { InjectionKey, Ref } from 'vue';

export const menuOpenKey = Symbol() as InjectionKey<Ref<boolean>>;
