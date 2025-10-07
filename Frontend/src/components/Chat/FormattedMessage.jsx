import { useState } from 'react';
import Toast from '../Toast/Toast';

const FormattedMessage = ({ message }) => {
  const [showToast, setShowToast] = useState(false);
  const [copiedCodeIndex, setCopiedCodeIndex] = useState(null);
  // Only format AI responses, keep user messages as plain text
  if (message.sender === 'user') {
    return <p className="text-sm md:text-base leading-relaxed">{message.text}</p>;
  }

  // Function to handle inline formatting (bold text, italic, inline code, etc.)
  const formatInlineText = (text) => {
    const parts = [];
    let currentIndex = 0;
    
    // Handle multiple patterns: **bold**, *italic*, `code`
    const patterns = [
      { regex: /\*\*(.*?)\*\*/g, component: (match, key) => 
        <strong key={key} className="font-semibold text-[#3c6e71]">{match[1]}</strong> 
      },
      { regex: /\*(.*?)\*/g, component: (match, key) => 
        <em key={key} className="italic text-gray-300">{match[1]}</em> 
      },
      { regex: /`([^`]+)`/g, component: (match, key) => 
        <code key={key} className="bg-gray-800 text-green-400 px-1 py-0.5 rounded text-sm font-mono">
          {match[1]}
        </code> 
      }
    ];
    
    let processedText = text;
    const replacements = [];
    
    // Find all matches for all patterns
    patterns.forEach((pattern, patternIndex) => {
      let match;
      pattern.regex.lastIndex = 0; // Reset regex
      
      while ((match = pattern.regex.exec(text)) !== null) {
        replacements.push({
          start: match.index,
          end: match.index + match[0].length,
          component: pattern.component(match, `${patternIndex}-${currentIndex++}`),
          priority: patternIndex // Code has highest priority (2), then italic (1), then bold (0)
        });
      }
    });
    
    // Sort by start position and priority
    replacements.sort((a, b) => {
      if (a.start !== b.start) return a.start - b.start;
      return b.priority - a.priority; // Higher priority first
    });
    
    // Build the result
    let lastIndex = 0;
    
    replacements.forEach(replacement => {
      // Add text before this replacement
      if (replacement.start > lastIndex) {
        const textBefore = text.substring(lastIndex, replacement.start);
        if (textBefore) parts.push(textBefore);
      }
      
      // Add the replacement component
      parts.push(replacement.component);
      lastIndex = replacement.end;
    });
    
    // Add remaining text
    if (lastIndex < text.length) {
      const remainingText = text.substring(lastIndex);
      if (remainingText) parts.push(remainingText);
    }
    
    return parts.length > 0 ? parts : [text];
  };

  // Copy to clipboard function
  const copyToClipboard = (text, codeIndex) => {
    navigator.clipboard.writeText(text).then(() => {
      setShowToast(true);
      setCopiedCodeIndex(codeIndex);
      // Reset the checkmark after 2 seconds
      setTimeout(() => setCopiedCodeIndex(null), 2000);
    }).catch(() => {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setShowToast(true);
      setCopiedCodeIndex(codeIndex);
      // Reset the checkmark after 2 seconds
      setTimeout(() => setCopiedCodeIndex(null), 2000);
    });
  };

  // Format AI responses
  const formatAIText = (text) => {
    const lines = text.split('\n');
    const elements = [];
    let currentIndex = 0;
    let i = 0;

    while (i < lines.length) {
      const line = lines[i];
      
      // Code blocks (```language or just ```)
      if (line.trim().startsWith('```')) {
        const language = line.trim().substring(3).trim() || 'text';
        const codeLines = [];
        i++; // Skip the opening ```
        
        // Collect code lines until closing ```
        while (i < lines.length && !lines[i].trim().startsWith('```')) {
          codeLines.push(lines[i]);
          i++;
        }
        
        const codeContent = codeLines.join('\n');
        
        const codeBlockIndex = currentIndex;
        elements.push(
          <div key={currentIndex++} className="!my-4 rounded-lg overflow-hidden border border-gray-600">
            {/* Code header with language and copy button */}
            <div className="flex justify-between items-center bg-gray-800 !px-4 !py-2 border-b border-gray-600">
              <span className="text-xs text-gray-300 font-mono uppercase">{language}</span>
              <button
                onClick={() => copyToClipboard(codeContent, codeBlockIndex)}
                className="text-xs text-gray-400 hover:text-white transition-colors !px-2 !py-1 rounded hover:bg-gray-700 flex items-center gap-1"
              >
                {copiedCodeIndex === codeBlockIndex ? (
                  <>
                    <span className="text-green-400">✓</span>
                    <span className="text-green-400">Copied</span>
                  </>
                ) : (
                  'Copy'
                )}
              </button>
            </div>
            {/* Code content */}
            <pre className="bg-gray-900 !p-4 overflow-x-auto">
              <code className="text-sm font-mono text-green-400 whitespace-pre">
                {codeContent}
              </code>
            </pre>
          </div>
        );
        i++; // Skip the closing ```
        continue;
      }
      
      // Inline code (`code`)
      const inlineCodeRegex = /`([^`]+)`/g;
      if (line.match(inlineCodeRegex)) {
        const formattedLine = line.replace(inlineCodeRegex, (match, code) => {
          return `<code class="bg-gray-800 text-green-400 px-2 py-1 rounded text-sm font-mono">${code}</code>`;
        });
        
        elements.push(
          <p key={currentIndex++} className="text-sm md:text-base leading-relaxed mb-2" 
             dangerouslySetInnerHTML={{ __html: formatInlineText(formattedLine).join('') }} />
        );
        i++;
        continue;
      }
      
      const trimmedLine = line.trim();
      
      // Headers (text wrapped in **)
      if (trimmedLine.match(/^\*\*.*\*\*:?$/)) {
        elements.push(
          <h3 key={currentIndex++} className="text-lg font-semibold text-[#3c6e71] border-b border-[#3c6e71]/30 pb-1 mt-3 mb-2">
            {trimmedLine.replace(/^\*\*|\*\*:?$/g, '')}
          </h3>
        );
      }
      // Bullet points
      else if (trimmedLine.match(/^[\*\-\•]\s/)) {
        const bulletText = trimmedLine.replace(/^[\*\-\•]\s/, '');
        elements.push(
          <div key={currentIndex++} className="flex items-start mb-1">
            <span className="text-[#3c6e71] mr-2 mt-1">•</span>
            <span className="text-sm md:text-base leading-relaxed">
              {formatInlineText(bulletText)}
            </span>
          </div>
        );
      }
      // Numbered lists
      else if (trimmedLine.match(/^\d+\.\s/)) {
        const number = trimmedLine.match(/^(\d+)\./)[1];
        const listText = trimmedLine.replace(/^\d+\.\s/, '');
        elements.push(
          <div key={currentIndex++} className="flex items-start mb-1">
            <span className="text-[#3c6e71] mr-2 mt-1 font-semibold">{number}.</span>
            <span className="text-sm md:text-base leading-relaxed">
              {formatInlineText(listText)}
            </span>
          </div>
        );
      }
      // Regular paragraphs
      else if (trimmedLine.length > 0) {
        elements.push(
          <p key={currentIndex++} className="text-sm md:text-base leading-relaxed mb-2">
            {formatInlineText(trimmedLine)}
          </p>
        );
      }
      
      i++;
    }

    return elements.length > 0 ? elements : [
      <p key={0} className="text-sm md:text-base leading-relaxed">{formatInlineText(text)}</p>
    ];
  };

  return (
    <>
      <div className="space-y-1">
        {formatAIText(message.text)}
      </div>
      <Toast 
        message="Code copied to clipboard!" 
        show={showToast} 
        onClose={() => setShowToast(false)} 
      />
    </>
  );
};

export default FormattedMessage;