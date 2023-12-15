export interface Post {
    id?: string;
    title: string;
    body: string;
    updating?: boolean;
}

export interface PostInput {
    title: string;
    body: string;
}
