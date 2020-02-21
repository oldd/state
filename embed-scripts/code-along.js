{
  const configSchema = {
    container: 'string, element, empty',
    type: 'string, what kind of code-along to render.  javascript/js or document for now',
    title: 'string, to become a main header',
    source: 'undefined -> empty code-along. string -> fetch from relative path. object -> name & path. array of strings or objects -> tabbed the-previous-things'
  }

  const resultSchema = { // future plans
    config: 'the unmodified config object',
    container: "element with input & output containers",
    editor: 'ace editor',
    resultsEl: 'coupler',
    active: "the active step object",
    steps: {
      type: 'array',
      description: 'if no steps, empty editor/results. if 1 step, no tabs. if 2+ steps, tab-it',
      items: {
        path: "relative path to file",
        code: "the code",
        session: "ace session",
        results: "element with name & most recent evaluation",
        button: "the button that goes up top",
        name: "given or default name "
      }
    }
  }
}

// do this with highlight.js? - nope, then extra dependency
const codeAlongGuide = `evaluate code: will run the code in the current editor ---
    ... capture asserts to display pass/fail
    ... try to stop your code after 1000+ loop iterations
    ... generate a search link for your errors
    ... indicate if errors were Creation or Execution phase
    ... remove all debugger statements
step through in debugger: will run the current editor ---
    ... insert a debugger statement before the first line
with infinite loop guard: will run the current editor ---
    ... like above, but will format your code
    ... try to insert an infinite loop guard at every loop
Open In Js Tutor: will open the current code in JS Tutor ---
    ... use this button ALL THE TIME!
Open In JSHint: opens your code in an online Linter that will ---
    ... point out syntax errors
    ... warn about some bad practices
    ... warn about possible runtime errors
    ... evaluate the complexity of your code
Format Code: will make code in the current editor prettier ---
    ... makes your code easier to read
`;

// - your code will be colored for easy reading
// - ctr-z will undo changes you made
// - ctr-shift-z will redo the changes
// - ctr-c will copy any highlighted text
// - ctr-v will paste the copied text
// - icons to the left of your code help with errors & syntax
// - changes ARE NOT saved when you refresh the web page
// - changes ARE saved when switching between exercises



async function codeAlong(config) {

  const container = (() => {
    if (!config) {
      return document.createElement('div');

    } if (config instanceof Element) {
      return config;

    } else if (typeof config === 'string') {
      return document.getElementById(config);

    } else if (!config.container) {
      return document.createElement('div');

    } else if (config.container instanceof Element) {
      return config.container;

    } else if (typeof config.container === 'string') {
      return document.getElementById(config.container);

    } else {
      throw new Error('unknown container');
    }
  })();


  const steps = [];

  const iframe = codeAlong.createIframe(config);

  const loadButton = document.createElement('button');
  loadButton.innerHTML = 'click to load code-along';
  loadButton.onclick = async () => {
    iframe.contentDocument.body.style = '';
    iframe.contentDocument.body.innerHTML = '';
    try {
      await new Promise((resolve, reject) => {
        const aceScript = document.createElement('script');
        aceScript.src = config.acePath ? config.acePath : "../embed-scripts/ace/ace.js";
        aceScript.type = "text/javascript";
        aceScript.charset = "utf-8";

        aceScript.addEventListener('load', () => {
          resolve();
          codeAlong.theRest(config, steps, iframe);
        });
        aceScript.addEventListener('error', (e) => reject(e.message))

        iframe.contentDocument.head.appendChild(aceScript);
      });
    } catch (err) {
      console.log(err);
      const error = document.createElement('code');
      error.innerHTML = 'could not reach internet or liveServer, unable to load code-along';
      error.style = 'position:absolute; position: fixed;top: 50%;left: 50%;transform: translate(-50%, -50%);text-align: center;';
      iframe.contentDocument.body.appendChild(error);
    };
  }

  const tempHeader = document.createElement('h1');
  tempHeader.innerHTML = config.title ? config.title : '';
  iframe.onload = () => {
    iframe.contentDocument.body.style = 'position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center;';
    iframe.contentDocument.body.appendChild(tempHeader);
    iframe.contentDocument.body.appendChild(loadButton);
  }

  container.appendChild(iframe);

  return { steps, container };

}

codeAlong.createIframe = () => {

  const iframe = document.createElement('iframe');
  iframe.style = 'height:93vh;width:100%;overflow:hidden;background-color:white;';
  iframe.setAttribute('scrolling', 'no');
  return iframe;

}

codeAlong.theRest = async (config, steps, iframe) => {
  const builtSteps = await (async () => {
    if (!config || !config.source) return [];

    const fetchSource = async path => {
      try {
        const res = await fetch(path);
        const code = res.text();
        return code;
      } catch (err) {
        return err.name + ": " + err.message;
      }
    }

    if (typeof config.source === 'string') {
      const code = await fetchSource(config.source);
      return [{
        code,
        path: config.source,
        name: config.name || 'code-along'
      }];
    } else if (Array.isArray(config.source)) {
      const fetched = config.source
        .map((path, ind) => {
          if (typeof path === 'string') {
            return {
              path,
              code: fetchSource(path),
              name: 'step ' + ind
            }
          } else if (path.constructor.name === "Object") {
            return {
              path,
              code: fetchSource(path.path),
              name: path.name || 'step ' + ind
            }
          } else {
            throw new Error('invalid step');
          }
        })
      for (let step of fetched) {
        step.code = await step.code;
      }
      return fetched;
    }
  })();

  builtSteps.forEach(step => steps.push(step));


  // async total side-effect
  if (config.type === 'document') {
    codeAlong.document(iframe, steps, config);
  } else if (config.type === 'js' || config.type === 'javascript') {
    codeAlong.js(iframe, steps, config);
  } else {
    codeAlong.js(iframe, steps, config);
  }

  // const setup = await codeAlong.setup(steps, config);
  // container.appendChild(setup);
}


codeAlong.document = (iframe, steps, config) => {
  const title = config.title;

  const stepsContainer = document.createElement('div');

  const editorContainer = document.createElement('div');
  editorContainer.style = 'height:98vh;width:55vw;';

  const ace = iframe.contentWindow.ace;
  // ace.require("ace/ext/language_tools"); // for code_lens eventually
  const editor = ace.edit(editorContainer);
  editor.setTheme('ace/theme/chrome');
  editor.setFontSize(12);
  editor.getSession().setMode('ace/mode/html');
  editor.getSession().setTabSize(2);

  if (steps.length === 0) {
    const defaultCode = "// https://developer.mozilla.org/en-US/docs/Web/API/Console/assert\n" +
      "console.assert(true, 'passing assert');\n" +
      "console.assert(false, 'failing assert');\n" +
      "\n// psst. Open your console for logging!";
    steps.push({
      code: defaultCode,
      name: 'default'
    })
  };

  steps.forEach(step => {
    step.session = ace.createEditSession(step.code, 'html');
    step.session.setMode('ace/mode/html');
  });

  if (steps.length > 1) {
    editorContainer.style = 'height:92vh;width:55vw;';
    const stepButtons = steps.map((step, index) => {
      const button = document.createElement('button');
      button.style.height = '5%'; // provisoire
      button.style.background = '';
      const name = step.name ? step.name : 'step ' + index;
      button.innerHTML = name;
      button.onclick = () => {

        active = step;
        stepButtons.forEach(stepButton => {
          stepButton.style.background = '';
        })
        button.style.background = 'darkgrey';

        editor.setSession(step.session);
        outputEl.src = "data:text/html;charset=utf-8," + encodeURIComponent(editor.getValue());

      }
      step.button = button;
      return button;
    });

    const buttonsContainer = steps
      .reduce((div, step) => {
        div.appendChild(step.button);
        return div;
      }, document.createElement('div'));
    stepsContainer.appendChild(buttonsContainer);

    steps[0].button.style.background = 'darkgrey';
  }

  stepsContainer.appendChild(editorContainer);

  editor.setSession(steps[0].session);
  editor.setValue(steps[0].code);

  const hixieButton = document.createElement('button');
  hixieButton.innerHTML = 'study in Live DOM Viewer';
  hixieButton.onclick = () => {
    const encodedHTML = encodeURIComponent(editor.getValue());
    const url = "https://software.hixie.ch/utilities/js/live-dom-viewer/?" + encodedHTML;
    window.open(url, "_blank");
  };

  const newTabButton = document.createElement('button');
  newTabButton.innerHTML = 'inspect/debug in new tab';
  newTabButton.onclick = () => {
    const x = window.open();
    x.document.open();
    x.document.write(editor.getValue());
    x.document.close();
  }


  const buttonDiv = document.createElement('div');
  buttonDiv.style = 'margin-top:2%;margin-bottom:2%;text-align:center;';
  buttonDiv.appendChild(newTabButton);
  buttonDiv.appendChild(hixieButton);


  const outputEl = document.createElement('iframe');
  // can do better than this
  config.title
    ? outputEl.style = "width:100%;height:85%;"
    : outputEl.style = "width:100%;height:90%;";
  outputEl.id = '\n-- study: rendered DOM --\n';
  outputEl.src = "data:text/html;charset=utf-8," + encodeURIComponent(steps[0].code);

  const outputContainer = document.createElement('div');
  outputContainer.style = 'height: 98vh; width: 45vw; border:solid 1px; padding-left:1%; padding-right:1%;';
  if (typeof title === 'string') {
    const titleEl = document.createElement('h1');
    titleEl.innerHTML = title;
    titleEl.style = 'text-align: center; margin-bottom:0%; margin-top:1%;';
    outputContainer.appendChild(titleEl);
  }
  outputContainer.appendChild(buttonDiv);
  outputContainer.appendChild(outputEl);

  editor.on("change", (e) => {
    outputEl.src = "data:text/html;charset=utf-8," + encodeURIComponent(editor.getValue());
  });


  iframe.contentDocument.body.style = 'display:flex; flex-direction:row;';
  iframe.contentDocument.body.appendChild(stepsContainer);
  iframe.contentDocument.body.appendChild(outputContainer);

}

codeAlong.js = (iframe, steps, config) => {

  const title = config.title;

  const stepsContainer = document.createElement('div');

  const editorContainer = document.createElement('div');
  editorContainer.style = 'height:98vh;width:55vw;';

  const ace = iframe.contentWindow.ace;
  const editor = ace.edit(editorContainer);
  editor.setTheme('ace/theme/chrome');
  editor.setFontSize(12);
  editor.getSession().setMode('ace/mode/javascript');
  editor.getSession().setTabSize(1);


  if (steps.length === 0) {
    const defaultCode = "// https://developer.mozilla.org/en-US/docs/Web/API/Console/assert\n" +
      "console.assert(true, 'passing assert');\n" +
      "console.assert(false, 'failing assert');\n";
    steps.push({
      code: defaultCode,
      name: 'default'
    })
  };

  steps.forEach(step => {
    step.session = ace.createEditSession(step.code, 'javascript');
    step.session.setMode('ace/mode/javascript');
    step.session.setOptions({ tabSize: 2, useSoftTabs: true });
  });

  const resultsContainer = document.createElement('div');


  if (steps.length > 1) {
    editorContainer.style = 'height:92vh;width:55vw;';
    const stepButtons = steps.map((step, index) => {
      const button = document.createElement('button');
      button.style = 'height:5%;';
      const name = step.name ? step.name : 'step ' + index;
      const code = document.createElement('code');
      code.innerHTML = name;
      button.appendChild(code);
      button.onclick = () => {

        active = step;
        stepButtons.forEach(stepButton => {
          stepButton.style.background = '';
        })
        button.style.background = 'darkgrey';

        editor.setSession(step.session);

        resultsContainer.innerHTML = '';

      }
      step.button = button;
      return button;
    });

    const buttonsContainer = steps
      .reduce((div, step) => {
        div.appendChild(step.button);
        return div;
      }, document.createElement('div'));
    buttonsContainer.style = 'padding-bottom:1%';
    stepsContainer.appendChild(buttonsContainer);

    steps[0].button.style.background = 'darkgrey';
  }

  stepsContainer.appendChild(editorContainer);

  editor.setSession(steps[0].session);

  editor.setValue(steps[0].code);

  const evaluateInCodeAlong = document.createElement('button');
  evaluateInCodeAlong.innerHTML = 'evaluate code';
  evaluateInCodeAlong.addEventListener('click', function evaluateCode() {
    resultsContainer.innerHTML = '';
    const results = codeAlong.preparing_your_code(editor.getValue());
    resultsContainer.appendChild(results);
  });

  function step_through_in_debugger() {
    resultsContainer.innerHTML = '';
    const allDone = codeAlong.step_through_in_debugger(editor.getValue());
    const debuggeredEl = document.createElement('pre');
    debuggeredEl.innerHTML = allDone;
    resultsContainer.appendChild(debuggeredEl);
  }
  const evaluateInDebugger = document.createElement('button');
  evaluateInDebugger.innerHTML = 'step through in debugger';
  evaluateInDebugger.addEventListener('click', step_through_in_debugger);

  function with_infinite_loop_guard(event) {
    resultsContainer.innerHTML = '';
    const max = Number(event.target.form.max.value);
    let allDone;
    try {
      // does it exist?
      js_beautify('', {
        indent_size: '  ',
        "brace_style": "collapse,preserve-inline",
      });
      allDone = codeAlong.format_and_loop_guard(
        js_beautify(editor.getValue(), {
          indent_size: '  ',
          "brace_style": "collapse,preserve-inline",
        })
        , max);
    } catch (err) {
      allDone = codeAlong.with_infinite_loop_guard(editor.getValue(), max);
    }
    const debuggeredEl = document.createElement('pre');
    debuggeredEl.innerHTML = allDone;
    resultsContainer.appendChild(debuggeredEl);
  }
  const withLoopGuard = document.createElement('input');
  withLoopGuard.setAttribute('type', 'button');
  withLoopGuard.value = '... with max_iterations = ';
  withLoopGuard.addEventListener('click', with_infinite_loop_guard);
  const maxIterationsInput = document.createElement('input');
  maxIterationsInput.value = 20;
  maxIterationsInput.name = 'max';
  maxIterationsInput.style = 'width:3em';

  const maxIterationsForm = document.createElement('form');
  maxIterationsForm.style = 'display:inline-block;';
  maxIterationsForm.appendChild(withLoopGuard);
  maxIterationsForm.appendChild(maxIterationsInput);

  const jsTutorButton = document.createElement('button');
  jsTutorButton.innerHTML = 'open in JS Tutor';
  jsTutorButton.onclick = () => {
    const encodedJST = encodeURIComponent(editor.getValue());
    const sanitizedJST = encodedJST
      .replace(/\(/g, '%28').replace(/\)/g, '%29')
      .replace(/%09/g, '%20%20');
    // const jsTutorURL = "http://www.pythontutor.com/live.html#code=" + sanitizedJST + "&cumulative=false&curInstr=2&heapPrimitives=nevernest&mode=display&origin=opt-live.js&py=js&rawInputLstJSON=%5B%5D&textReferences=false";
    const jsTutorURL = "http://www.pythontutor.com/javascript.html#code=" + sanitizedJST + "&curInstr=0&mode=display&origin=opt-frontend.js&py=js&rawInputLstJSON=%5B%5D";
    window.open(jsTutorURL, '_blank');
  };

  const linterButton = document.createElement('button');
  linterButton.innerHTML = 'open in JSHint';
  linterButton.onclick = () => {
    const encodedLintee = encodeURIComponent(editor.getValue());
    const sanitizedLintee = encodedLintee
      .replace(/\(/g, '%28').replace(/\)/g, '%29')
      .replace(/%09/g, '%20%20');
    const linterURL = "http://janke-learning.org/linter/?snippet=" + sanitizedLintee;
    window.open(linterURL, '_blank');
  };

  const buttonsButton = document.createElement('button');
  buttonsButton.innerHTML = 'so many buttons?';
  buttonsButton.onclick = () => alert(codeAlongGuide);


  const buttonDiv = document.createElement('div');
  buttonDiv.style = 'margin-top:2%;margin-bottom:2%;text-align:center;';
  buttonDiv.appendChild(evaluateInCodeAlong);
  buttonDiv.appendChild(evaluateInDebugger);
  buttonDiv.appendChild(maxIterationsForm);
  buttonDiv.appendChild(document.createElement('br'));
  if (!config.async === true) {
    buttonDiv.appendChild(jsTutorButton);
  }
  try {
    // does it exist?
    prettier.format(
      '',
      {
        parser: "babylon",
        plugins: prettierPlugins
      }
    );

    const formatCode = document.createElement('button');
    formatCode.innerHTML = 'find syntax errors';
    formatCode.addEventListener('click', () => {
      try {
        prettier.format(
          editor.getValue(),
          {
            parser: "babylon",
            plugins: prettierPlugins
          }
        );
        const allGoodPre = document.createElement('pre');
        allGoodPre.innerHTML = '  no syntax errors found';
        allGoodPre.style = 'padding-left:5px;'
        resultsContainer.innerHTML = '';
        resultsContainer.appendChild(allGoodPre);
      } catch (err) {
        const errPre = document.createElement('pre');
        errPre.innerHTML = err.message;
        errPre.style = 'padding-left:5px;'
        resultsContainer.innerHTML = '';
        resultsContainer.appendChild(errPre);
      }
    });
    buttonDiv.appendChild(formatCode);
  } catch (e) { }

  try {
    // does it exist?
    js_beautify('', {
      indent_size: '  ',
      "brace_style": "collapse,preserve-inline",
    })

    const formatCode = document.createElement('button');
    formatCode.innerHTML = 'format code';
    formatCode.addEventListener('click', () => {
      const beautified = js_beautify(editor.getValue(), {
        indent_size: 2,
        "brace_style": "collapse,preserve-inline",
      })
      editor.setValue(beautified);
    });
    buttonDiv.appendChild(formatCode);
  } catch (e) { }

  buttonDiv.appendChild(linterButton);
  // buttonDiv.appendChild(buttonsButton);



  resultsContainer.id = '-- assertions --';
  resultsContainer.style = config.title
    ? 'overflow-y: scroll; height: 76%'
    : 'overflow-y: scroll; height: 86%';


  const initialResult = document.createElement('pre');
  resultsContainer.appendChild(initialResult);

  const collapseOutputButton = document.createElement('button');
  collapseOutputButton.style = 'float:right;';
  collapseOutputButton.innerHTML = 'collapse results';
  const renderCollapsed = () => {
    outputContainer.innerHTML = '';
    outputContainer.appendChild(collapsedOutput);
    // outputContainer.style = 'height: 5vh; width: 98vw; z-index: 100; position: absolute; bottom: 3vh;';
    outputContainer.style = '  z-index: 100; position: absolute; bottom: 0px; right: 0px;';
    editorContainer.style = 'height:92vh;width:94vw;';
    editor.resize();
  };
  collapseOutputButton.onclick = renderCollapsed;

  const visibleContainer = document.createElement('div');
  visibleContainer.appendChild(collapseOutputButton);
  // visibleContainer.style = 'height: 98vh; width: 55vw; border:solid 1px;';
  visibleContainer.style = 'border:solid 1px;';
  if (typeof title === 'string') {
    const titleEl = document.createElement('h1');
    titleEl.innerHTML = title;
    titleEl.style = 'text-align: center;';
    visibleContainer.appendChild(titleEl);
  }
  visibleContainer.appendChild(buttonDiv);
  visibleContainer.appendChild(document.createElement('hr'));
  visibleContainer.appendChild(resultsContainer);


  const collapsedOutput = document.createElement('div');
  // collapsedOutput.style = 'height: 10vh; width: 55vw; border:solid 1px;';
  collapsedOutput.style = 'border:solid 1px; opacity: 1; background-color: white; float: right;';

  const unCollapseOutputButton = document.createElement('button');
  // unCollapseOutputButton.style = 'float:right;';
  unCollapseOutputButton.innerHTML = 'un-collapse results';
  const renderUnCollapsed = () => {
    outputContainer.innerHTML = '';
    outputContainer.appendChild(visibleContainer);
    outputContainer.style = 'height: 96vh; width: 45vw;';
    editorContainer.style = 'height:92vh;width:55vw;';
    editor.resize();
  };
  unCollapseOutputButton.onclick = renderUnCollapsed;

  const evalButton = document.createElement('button');
  evalButton.innerHTML = '&nbsp; &nbsp; run code &nbsp; &nbsp;';
  evalButton.addEventListener('click', function eval_code() {
    try {
      eval(editor.getValue())
    } catch (err) {
      console.log(err);
    }
  });

  collapsedOutput.appendChild(evalButton);
  const evaluateInDebuggerCopy = evaluateInDebugger.cloneNode(true);
  evaluateInDebuggerCopy.onclick = step_through_in_debugger;
  collapsedOutput.appendChild(evaluateInDebuggerCopy);
  const maxIterationsFormCopy = maxIterationsForm.cloneNode(true);
  {
    maxIterationsFormCopy.childNodes[0].onclick = with_infinite_loop_guard;

    function with_infinite_loop_guard(event) {
      resultsContainer.innerHTML = '';
      const max = Number(event.target.form.max.value);
      try {
        // does it exist?
        js_beautify('', {
          indent_size: '  ',
          "brace_style": "collapse,preserve-inline",
        });
        codeAlong.format_and_loop_guard(
          js_beautify(editor.getValue(), {
            indent_size: '  ',
            "brace_style": "collapse,preserve-inline",
          })
          , max);
      } catch (err) {
        codeAlong.with_infinite_loop_guard(editor.getValue(), max);
      }
    }
  }
  collapsedOutput.appendChild(maxIterationsFormCopy);
  collapsedOutput.appendChild(unCollapseOutputButton);

  if (typeof title === 'string') {
    const titleEl = document.createElement('h1');
    titleEl.innerHTML = title;
    titleEl.style = 'text-align: center; margin-top: 0%;margin-bottom: 0%;';
    collapsedOutput.appendChild(titleEl);
  }

  const outputContainer = document.createElement('div');
  outputContainer.style = 'height: 96vh; width: 45vw;';
  if (config.collapsed === true) {
    renderCollapsed();
  } else {
    renderUnCollapsed();
  }

  iframe.contentDocument.body.style = 'display:flex; flex-direction:row;';
  iframe.contentDocument.body.appendChild(stepsContainer);
  iframe.contentDocument.body.appendChild(outputContainer);

}

codeAlong.step_through_in_debugger = function in_debugger(your_source_code) {
  try {
    eval(
      'debugger; // injected by codeAlong\n'
      + '\n'
      + your_source_code
    );
  } catch (err) {
    console.log(err);
  };
  return "    All done! \n\n    (psst. try again with devtools open if they aren't already)";
}

codeAlong.format_and_loop_guard = function with_infinite_loop_guard(your_source_code, max_iterations) {
  let number_of_loops = 0;
  try {
    eval(
      'debugger; // injected by codeAlong\n'
      + '\n'
      + js_beautify(
        your_source_code.replace(/for *\(.*\{|while *\(.*\{|do *\{/g, loopHead => {
          number_of_loops++;
          return `let loop_${number_of_loops}_iterations = 0; // injected by codeAlong\n ${loopHead}\n if (++loop_${number_of_loops}_iterations > ${max_iterations}) {console.log('Loop ${number_of_loops} exceeded ${max_iterations} iterations'); break;} // injected by codeAlong\n`
        }),
        {
          indent_size: '  ',
          "brace_style": "collapse,preserve-inline",
        }
      )
    );
  } catch (err) {
    console.log(err);
  };
  return "     All done! \n\n     (psst. your devtools must be open)";
}
codeAlong.with_infinite_loop_guard = function with_infinite_loop_guard(your_source_code, max_iterations) {
  let number_of_loops = 0;
  try {
    eval(
      'debugger; // injected by codeAlong\n'
      + '\n'
      +
      your_source_code.replace(/for *\(.*\{|while *\(.*\{|do *\{/g, loopHead => {
        number_of_loops++;
        return `let loop_${number_of_loops}_iterations = 0; // injected by codeAlong\n ${loopHead}\n if (++loop_${number_of_loops}_iterations > ${max_iterations}) {console.log('Loop ${number_of_loops} exceeded ${max_iterations} iterations'); break;} // injected by codeAlong\n`
      })
    );
  } catch (err) {
    console.log(err);
  };
  return "     All done! \n\n     (psst. your devtools must be open)";
}


codeAlong.preparing_your_code = function (your_source_code) {
  const resultsEl = document.createElement('ol');

  const nativeConsole = console;
  console = Object.create(nativeConsole);
  console.assert = function () {
    nativeConsole.assert(...Array.from(arguments));

    const statusString = arguments[0] ? 'PASS: ' : 'FAIL: ';
    const statusEl = document.createElement('p');
    statusEl.innerHTML = statusString;
    statusEl.style.display = 'inline';
    // revisit color choices
    statusEl.style.color = arguments[0] ? 'green' : 'orange';

    const messages = document.createElement('code');
    messages.innerHTML = '  ' + Array.from(arguments)
      .slice(1, arguments.length)
      .toString()
      .replace(',', ', ');

    const newLi = document.createElement('li');
    newLi.style = 'padding-top:1%;'
    newLi.appendChild(statusEl);
    newLi.appendChild(messages);

    resultsEl.appendChild(newLi);

  }

  // for capturing and displaying async errors
  {
    // console.error = function () {
    //   nativeConsole.error('- logged with console.error -\n', ...Array.from(arguments));

    //   const before = document.createElement('pre');
    //   before.innerHTML = '- begin console.error -';
    //   resultsEl.appendChild(before);

    //   if (arguments[0] instanceof Error) {
    //     resultsEl.appendChild(renderError(arguments[0], true));
    //     arguments = Array.from(arguments).splice(1, arguments.length);
    //   }

    //   if (arguments.length !== 0) {
    //     const messages = document.createElement('code');
    //     messages.innerHTML = Array.from(arguments)
    //       .toString()
    //       .replace(',', ', ');
    //     messages.style.color = 'red';

    //     resultsEl.appendChild(messages);
    //   }

    //   const after = document.createElement('pre');
    //   after.innerHTML = '- end console.error -';
    //   resultsEl.appendChild(after);

    // }

    // // debugger;
    // // declare this at the top of each example
    // const startTime = (new Date()).getTime();
    // const elapsed = () => {
    //   const now = (new Date()).getTime();
    //   return Math.round(now - startTime) + ' ms';
    // };


    // const requestURL = "https://hacyourfuure.be/practice-api/food/wet/soups.json";

    // fetch(requestURL)
    //   .then(function parseResponse(resp) { return resp.json() })
    //   .then(function workWithData(data) {
    //     // write me!
    //   })
    //   .then(function assertResult(result) {
    //     console.assert(result === 3, elapsed() + ' - result should be 3');
    //   })
    //   .catch(function handleErrors(err) {
    //     console.error(err, elapsed() + ' - Test 2', 223)
    //   });
  }

  const renderError = (err, noCallstackMessage) => {
    const errorEl = document.createElement('pre');
    errorEl.style.color = "red";
    const duckDuckLink = document.createElement('a');
    duckDuckLink.innerHTML = '<strong>' + err.name + '</strong>: ' + err.message + ' (click to search)';
    duckDuckLink.href = `https://duckduckgo.com/?q=javascript+${err.name}+${err.message}&atb=v185-2_d&ia=web`;
    duckDuckLink.target = '_blank';
    duckDuckLink.style.color = 'red';
    const searchButton = document.createElement('button');
    searchButton.appendChild(duckDuckLink)
    errorEl.appendChild(searchButton);
    if (!noCallstackMessage) {
      errorEl.appendChild(document.createTextNode('\n\n   callstack is logged to the console'));
    }
    return errorEl;
  }
  const renderHaltingWarning = (err) => {
    const warningEl = document.createElement('pre');
    warningEl.style.color = "#ff6f3f";
    warningEl.innerHTML = 'Warning: ' + err.message + '\n\n   callstack is logged to the console';
    return warningEl;
  }
  const renderPhase = didExecute => {
    const phaseEl = document.createElement('pre');
    const phase = didExecute.status ? 'Execution Phase' : "Creation Phase"
    phaseEl.innerHTML = '   caught during ' + phase;
    return phaseEl;
  }

  const didExecute = { status: false };
  try {
    const deDebuggered = codeAlong.deDebugger(your_source_code);
    // https://github.com/xieranmaya/infinite-loop-detector
    const loopDetected = deDebuggered.replace(/for *\(.*\{|while *\(.*\{|do *\{/g, loopHead => {
      const id = parseInt(Math.random() * Number.MAX_SAFE_INTEGER) // not guaranteed unique, but good enough
      return `let __${id} = 0;${loopHead}if (++__${id} > 1000) throw new Error('Loop exceeded 1000 iterations');`
    });
    (function editor() {
      eval('(function executing_prepared_code(console) { didExecute.status = true;' + loopDetected + '\n})(console);');
    })();
  } catch (err) {
    const errOrWarning = err.message === 'Loop exceeded 1000 iterations'
      ? renderHaltingWarning(err)
      : renderError(err);
    resultsEl.appendChild(errOrWarning);
    resultsEl.appendChild(renderPhase(didExecute));
    console.error(err);
  }

  console = nativeConsole;

  return resultsEl;

}

codeAlong.deDebugger = code => code
  .replace(';debugger;', ';;')
  .replace(' debugger;', ' ;')
  .replace('\tdebugger;', '\t;')
  .replace('\ndebugger;', '\n;')
  .replace(';debugger ', '; ')
  .replace(' debugger ', '  ')
  .replace('\tdebugger ', '\t ')
  .replace('\ndebugger ', '\n ')
  .replace(';debugger\t', ';\t')
  .replace(' debugger\t', ' \t')
  .replace('\tdebugger\t', '\t\t')
  .replace('\ndebugger\t', '\n\t')
  .replace(';debugger\n', ';\n')
  .replace(' debugger\n', ' \n')
  .replace('\tdebugger\n', '\t\n')
  .replace('\ndebugger\n', '\n\n');
