import { Todo } from "@/constants/Dummy";

export const keyExtractor = <T extends { id: string }>(item: T): string =>
    item.id;
