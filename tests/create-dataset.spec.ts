import { test, expect } from '@wordpress/e2e-test-utils-playwright';

const testTitle = 'Test Dataset';
const testContent = 'This is a test dataset';

test.describe('Create Dataset', () => {
	test('Ensure dataset post type is properly registered', async ({
		requestUtils,
	}) => {
		const datasetPosts = await requestUtils.rest({
			path: '/wp/v2/dataset',
			method: 'GET',
		});
		expect(datasetPosts).toBeDefined();
	});

	test('Ensure datasets taxonomy is properly registered', async ({
		requestUtils,
	}) => {
		const datasetsTerms = await requestUtils.rest({
			path: '/wp/v2/datasets',
			method: 'GET',
		});
		expect(datasetsTerms).toBeDefined();
	});

	test('Dataset post created', async ({ admin, editor, requestUtils }) => {
		await admin.createNewPost({
			title: testTitle,
			content: testContent,
			postType: 'dataset',
		});
		// Publish the dataset
		await editor.publishPost();

		// Get the created dataset via REST API
		const datasetPosts = await requestUtils.rest({
			path: '/wp/v2/dataset',
			method: 'GET',
		});
		// Get the first item out of the datasetPosts array
		const datasetPost = datasetPosts?.[0];
		// Verify the dataset was created with correct title and content
		expect(datasetPost.title.rendered).toBe(testTitle);
		expect(datasetPost.content.rendered).toContain(testContent);
	});

	test('Matching datasets term created with dataset post', async ({
		requestUtils,
	}) => {
		const datasetsTerms = await requestUtils.rest({
			path: '/wp/v2/datasets',
			method: 'GET',
		});
		// Get the first item out of the datasetsTerms array
		const datasetsTerm = datasetsTerms?.[0];
		// Verify the datasets term was created with correct title and content
		expect(datasetsTerm.name).toBe(testTitle);
	});

	test('Publish new post with dataset term', async ({
		admin,
		editor,
		page,
		requestUtils,
	}) => {
		await admin.createNewPost({
			title: 'Test Post',
			content: 'This is a test post',
			postType: 'post',
		});

		await page.getByRole('button', { name: 'Datasets' }).click();

		await page.getByLabel('Add New Dataset').click();
		await page.getByLabel('Add New Dataset').fill(testTitle);
		await page.getByLabel(testTitle).first().click();

		// Publish the posts.
		await editor.publishPost();

		// Confirm the post has a datasets term in the rest api
		const testPosts = await requestUtils.rest({
			path: '/wp/v2/posts',
			method: 'GET',
		});
		// Get the first item out of the testPosts array
		const testPost = testPosts?.[0];
		// Verify the post has a datasets term in the rest api
		expect(testPost.datasets).toHaveLength(1);
	});
});
