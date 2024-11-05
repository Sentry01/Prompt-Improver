import * as React from "react";
import { createRoot } from "react-dom/client";
import { SparkApp, PageContainer, Input, Button, Card, Textarea } from "@github/spark/components";

function CopilotPromptImprover() {
  const [initialPrompt, setInitialPrompt] = React.useState("");
  const [improvedPrompt, setImprovedPrompt] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const improvePrompt = async () => {
    setIsLoading(true);
    const smartPrompt = spark.llmPrompt`
    Improve the following Copilot prompt to be more specific and align with SMART goals:
    
    Original prompt: ${initialPrompt}
    
    Please provide an improved version that is:
    - Specific: Clearly defined and unambiguous
    - Measurable: Include criteria for measuring progress and success
    - Achievable: Realistic and attainable
    - Relevant: Aligned with the overall objective
    - Time-bound: Include a deadline or timeframe
    
    Improved prompt:`;

    try {
      const result = await spark.llm(smartPrompt);
      setImprovedPrompt(result.trim());
    } catch (error) {
      console.error("Error improving prompt:", error);
      setImprovedPrompt("An error occurred while improving the prompt. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageContainer maxWidth="medium">
      <Card className="p-6">
        <h1 className="text-2xl font-bold mb-4">Copilot Prompt Improver</h1>
        <p className="mb-4">Enter your initial Copilot prompt, and we'll help you make it more specific and aligned with SMART goals.</p>
        
        <Textarea
          className="w-full mb-4"
          placeholder="Enter your initial Copilot prompt here..."
          value={initialPrompt}
          onChange={(e) => setInitialPrompt(e.target.value)}
          rows={4}
        />
        
        <Button
          variant="primary"
          onClick={improvePrompt}
          disabled={isLoading || !initialPrompt.trim()}
          className="mb-4"
        >
          {isLoading ? "Improving..." : "Improve Prompt"}
        </Button>
        
        {improvedPrompt && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Improved Prompt:</h2>
            <Card className="p-4 bg-gray-100">
              <p>{improvedPrompt}</p>
            </Card>
          </div>
        )}
      </Card>
    </PageContainer>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(
  <SparkApp>
    <CopilotPromptImprover />
  </SparkApp>
);

