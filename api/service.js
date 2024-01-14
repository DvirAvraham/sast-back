const fs = require("fs");
const path = require("path");
const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");
const {executeCommand} = require("../services/ssh-service");

module.exports = {
    write,
    fetch,
    computeData
  }

  async function fetch(data){
    try {
      let toolRes = await executeCommand()
      toolRes = computeData(toolRes)
      write(data,toolRes)
      write(data)
    } catch (err) {
      console.log(err);
    }
  }

  async function write(data,toolRes){
    
    data.clientName = toolRes
      const content = fs.readFileSync(
              path.resolve(__dirname, '..\\templates\\' + "template" + ".docx"), "binary");
              const zip = new PizZip(content)
              const doc = await _createDoc(zip,data)
              const buf = doc.getZip().generate({ type: "nodebuffer" });
              try{
                      fs.writeFileSync(path.resolve(`./results/success_${Date.now()}.docx`), buf);
                  }catch(err){
                          console.log('failed writing the file',err);
                      }
  }

function computeData(data){
    // console.log(0,data);
    //   tempVar = data
    // console.log(0.1,tempVar);
    // write(data) 
    return data
  }
         
           
  async function _createDoc(zip, renderData) {
                try {
                    doc = new Docxtemplater(zip, {
                        delimiters: { start: "<!", end: "!>" },
                        nullGetter: _nullGetter,
                        paragraphLoop: true,
                linebreaks: true,
            });
        } catch (error) {
            _errorHandler(error);
        }
  
        //set the templateVariables
        doc.setData({
            ...renderData,
            pageBreak: `<w:p><w:r><w:br w:type="page"/></w:r></w:p>`,
        });
        
        try {
            doc.render();
        } catch (error) {
      _errorHandler(error);
    }
    return doc;
  }

  function _nullGetter(part, scopeManager) {
      /*
      If the template is {#users}{name}{/} and a value is undefined on the
      name property:
      
      - part.value will be the string "name"
      - scopeManager.scopePath will be ["users"] (for nested loops, you would have multiple values in this array, for example one could have ["companies", "users"])
      - scopeManager.scopePathItem will be equal to the array [2] if
      this happens for the third user in the array.
      - part.module would be empty in this case, but it could be "loop",
      "rawxml", or or any other module name that you use.
      */
     
     if (!part.module) {
         // part.value contains the content of the tag, eg "name" in our example
         // By returning '{' and part.value and '}', it will actually do no replacement in reality. You could also return the empty string if you prefered.
         return "{" + part.value + "}";
        }
        if (part.module === "rawxml") {
      return "";
    }
    return "";
  }

  function _errorHandler(error) {
      // console.log(JSON.stringify({ error: error }, replaceErrors)); 888888888888888888888888888888888888888888888888888888888888888888888888888
      if (error.properties && error.properties.errors instanceof Array) {
          const errorMessages = error.properties.errors
          .map(function (error) {
              return error.properties.explanation;
            })
            .join("\n");
            console.log("errorMessages", errorMessages);
            // errorMessages is a humanly readable message looking like this :
            // 'The tag beginning with "foobar" is unopened'
        }
        throw error;
  }
    
