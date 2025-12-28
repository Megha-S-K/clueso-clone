export default function ArticleEditor({ article, setArticle }) {
    return (
        <div className="flex-1 p-6">
        <h3 className="font-semibold mb-2">Generated Article</h3>

        <textarea
            className="w-full h-[80vh] border p-3 resize-none"
            value={article}
            placeholder="AI-generated article will appear here..."
            onChange={(e) => setArticle(e.target.value)}
        />
        </div>
    );
}
