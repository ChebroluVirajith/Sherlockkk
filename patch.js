const fs = require('fs');
const files = ['d:/Downloads/Sherlockkk-main/Sherlockkk-main/feed.html', 'd:/Downloads/Sherlockkk-main/Sherlockkk-main/part2.html'];

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');

    // add state for passwords and errors if not present
    if (file.includes('feed.html') && !content.includes('const [passwords, setPasswords]')) {
        content = content.replace(
            `const [showContinue, setShowContinue] = useState({});`,
            `const [showContinue, setShowContinue] = useState({});\n      const [passwords, setPasswords] = useState({});\n      const [errors, setErrors] = useState({});`
        );
    }
    
    // remove timeout that automatically sets showContinue
    let timeoutRegex = /setTimeout\(\(\) => \{[\s\S]*?\}, 60000\);/g;
    content = content.replace(timeoutRegex, '');

    // replace the continue button logic with the password check
    let modalRegex = /<div className="evidence-modal-title">⚠ NEW EVIDENCE UNCOVERED ⚠<\/div>[\s\S]*?\{showContinue\[clue\.id\] && \([\s\S]*?<\/button>\s*\)\}\s*<\/div>/g;
    
    let replacement = `<div className="evidence-modal-title">⚠ NEW EVIDENCE UNCOVERED ⚠</div>
                                {!showContinue[clue.id] ? (
                                  <div style={{marginTop: '1.5rem', textAlign: 'center'}}>
                                    <div style={{marginBottom: '0.5rem', fontFamily: 'var(--font-type)', color: 'var(--ink-mid)'}}>ENTER DECRYPTED PASSCODE</div>
                                    <div style={{display: 'flex', gap: '0.5rem', justifyContent: 'center'}}>
                                      <input 
                                        type="text" 
                                        className="answer-input" 
                                        placeholder="Passcode..." 
                                        value={passwords[clue.id] || ''}
                                        onChange={(e) => setPasswords(prev => ({...prev, [clue.id]: e.target.value}))}
                                        style={{maxWidth: '200px'}} 
                                      />
                                      <button 
                                        className="submit-btn" 
                                        style={{minHeight: '40px', padding: '0 1.5rem', fontSize: '0.8rem'}}
                                        onClick={() => {
                                          const val = (passwords[clue.id] || "").toUpperCase().trim();
                                          if (val === "MORIARTY") {
                                            setShowContinue(prev => ({ ...prev, [clue.id]: true }));
                                            setErrors(prev => ({ ...prev, [clue.id]: "" }));
                                          } else {
                                            setErrors(prev => ({ ...prev, [clue.id]: "INCORRECT PASSCODE. TRY AGAIN." }));
                                          }
                                        }}>
                                        VERIFY
                                      </button>
                                    </div>
                                    {errors && errors[clue.id] && <div className="error-msg" style={{display: 'block', marginTop: '0.5rem'}}>{errors[clue.id]}</div>}
                                  </div>
                                ) : (
                                  <button onClick={handleContinue} className="enter-btn" style={{maxWidth: '400px', marginTop: '2rem'}}>
                                    CONTINUE THE INVESTIGATION &rarr;
                                  </button>
                                )}
                              </div>`;
                              
    content = content.replace(modalRegex, replacement);

    fs.writeFileSync(file, content);
}
console.log("Successfully patched files!");
