/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/

import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	const provider1 = vscode.languages.registerCompletionItemProvider('plaintext', {

		provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext) {

			// a simple completion item which inserts `Hello World!`
			const simpleCompletion = new vscode.CompletionItem('Hello World!');

			// a completion item that inserts its text as snippet,
			// the `insertText`-property is a `SnippetString` which will be
			// honored by the editor.
			const snippetCompletion = new vscode.CompletionItem('Good part of the day');
			snippetCompletion.insertText = new vscode.SnippetString('Good ${1|morning,afternoon,evening|}. It is ${1}, right?');
			const docs: any = new vscode.MarkdownString("Inserts a snippet that lets you select [link](x.ts).");
			snippetCompletion.documentation = docs;
			docs.baseUri = vscode.Uri.parse('http://example.com/a/b/c/');

			// a completion item that can be accepted by a commit character,
			// the `commitCharacters`-property is set which means that the completion will
			// be inserted and then the character will be typed.
			const commitCharacterCompletion = new vscode.CompletionItem('console');
			commitCharacterCompletion.commitCharacters = ['.'];
			commitCharacterCompletion.documentation = new vscode.MarkdownString('Press `.` to get `console.`');

			// a completion item that retriggers IntelliSense when being accepted,
			// the `command`-property is set which the editor will execute after 
			// completion has been inserted. Also, the `insertText` is set so that 
			// a space is inserted after `new`
			const commandCompletion = new vscode.CompletionItem('new');
			commandCompletion.kind = vscode.CompletionItemKind.Keyword;
			commandCompletion.insertText = 'new ';
			commandCompletion.command = { command: 'editor.action.triggerSuggest', title: 'Re-trigger completions...' };

			// return all completion items as array
			return [
				simpleCompletion,
				snippetCompletion,
				commitCharacterCompletion,
				commandCompletion
			];
		}
	});

	const provider2 = vscode.languages.registerCompletionItemProvider(
		'plaintext',
		{
			provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {

				// get all text until the `position` and check if it reads `console.`
				// and if so then complete if `log`, `warn`, and `error`
				const linePrefix = document.lineAt(position).text.slice(0, position.character);
				if (!linePrefix.endsWith('console.')) {
					return undefined;
				}

				return [
					new vscode.CompletionItem('log', vscode.CompletionItemKind.Method),
					new vscode.CompletionItem('warn', vscode.CompletionItemKind.Method),
					new vscode.CompletionItem('error', vscode.CompletionItemKind.Method),
				];
			}
		},
		'.' // triggered whenever a '.' is being typed
	);

	const triggerChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ.{'.split('');
	const provider3 = vscode.languages.registerCompletionItemProvider(
		'sample-properties-yaml',
		{
			provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {

				return [
					new vscode.CompletionItem('spring-log', vscode.CompletionItemKind.Method),
					new vscode.CompletionItem('spring-warn', vscode.CompletionItemKind.Method),
					new vscode.CompletionItem('spring-error', vscode.CompletionItemKind.Method),
					new vscode.CompletionItem('yaml-log', vscode.CompletionItemKind.Method),
					new vscode.CompletionItem('yaml-warn', vscode.CompletionItemKind.Method),
					new vscode.CompletionItem('yaml-error', vscode.CompletionItemKind.Method),
					new vscode.CompletionItem('management', vscode.CompletionItemKind.Method),
					new vscode.CompletionItem('debug-log', vscode.CompletionItemKind.Method),
					new vscode.CompletionItem('debug-warn', vscode.CompletionItemKind.Method),
					new vscode.CompletionItem('debug-error', vscode.CompletionItemKind.Method),
			];
			}
		},
		...triggerChars
	)

	context.subscriptions.push(provider1, provider2, provider3);
}
