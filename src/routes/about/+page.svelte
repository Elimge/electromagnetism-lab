<!-- src/routes/about/+page.svelte -->
<script lang="ts">
    import { _ } from "svelte-i18n";
</script>

<div class="about-container">
    <h1>{$_("about.title")}</h1>
    
    <section class="credits">
        <p>{$_("about.credits.p1")}</p>
        <ul>
            <li>{$_("about.credits.author_label")}: <a href="https://github.com/Elimge" target="_blank" rel="noopener noreferrer">@elimge on GitHub</a></li>
            <li>{$_("about.credits.repo_label")}: <a href="https://github.com/Elimge/electromagnetism-lab" target="_blank" rel="noopener noreferrer">Elimge/electromagnetism-lab</a></li>
		</ul>
    </section>

    <section class="feedback">
        <h2>{$_("about.feedback.title")}</h2>
        <div class="feedback-box non-dev">
            <h3>{$_("about.feedback.non_dev.title")}</h3>
            <p>{$_("about.feedback.non_dev.p1")}</p>
            <a href="https://tally.so/r/waLXpb" class="button" target="_blank" rel="noopener noreferrer">
				{$_('about.feedback.non_dev.button')}
			</a>
        </div>

        <div class="feedback-box dev">
            <h3>{$_("about.feedback.dev.title")}</h3>
            <p>{$_("about.feedback.dev.p1")}</p>
            <div class="dev-links">
                <a href="https://github.com/Elimge/electromagnetism-lab/issues/new/choose" class="button" target="_blank" rel="noopener noreferrer">
					{$_('about.feedback.dev.issue_button')}
				</a>
                <a href="https://github.com/Elimge/electromagnetism-lab/discussions" class="button secondary" target="_blank" rel="noopener noreferrer">
					{$_('about.feedback.dev.discussion_button')}
				</a>
            </div>
        </div>
    </section>
</div>

<style>
	.about-container {
		max-width: 800px;
		margin: 2rem auto;
		padding: 1rem 2rem;
		background-color: var(--bg-secondary);
		border-radius: 8px;
		color: var(--text-primary);
		border: 1px solid var(--border-color);
		height: calc(100% - 6rem); /* 100% de la altura del main menos el padding vertical */
		overflow-y: auto; /* Permite scroll si el contenido es muy largo */
        font-family: Tahoma, sans-serif; 
	}

	section {
		margin-bottom: 2rem;
	}

	a {
		color: #007bff;
		text-decoration: none;
	}
	a:hover {
		text-decoration: underline;
	}

	.feedback-box {
		border: 1px solid var(--border-color);
		padding: 1.5rem;
		border-radius: 8px;
		margin-top: 1rem;
	}

	.button {
		display: inline-block;
		padding: 10px 20px;
		background-color: #007bff;
		color: white;
		border-radius: 5px;
		text-decoration: none;
		font-weight: bold;
		transition: background-color 0.2s;
	}
	.button:hover {
		background-color: #0056b3;
		text-decoration: none;
	}
	.button.secondary {
		background-color: transparent;
		border: 1px solid #007bff;
		color: #007bff;
	}
	.button.secondary:hover {
		background-color: rgba(0, 123, 255, 0.1);
	}
	.dev-links {
		display: flex;
		gap: 1rem;
	}
</style>