import {CancellationToken, DocumentSemanticTokensProvider, ProviderResult, SemanticTokens, TextDocument} from "vscode";

export class JavaSemanticTokensProvider implements DocumentSemanticTokensProvider {

	provideDocumentSemanticTokens(document: TextDocument, token: CancellationToken): ProviderResult<SemanticTokens> {
		return Promise.resolve(null);
	}
}