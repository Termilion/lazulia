export interface Article {
	metadata: {
		creator: string;
		date: string;
		likes: number;
	}
	title: string;
	content: string;
	visible: boolean;
}