const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/execute", (req, res) => {
  const { language, code } = req.body;
  let command;

  if (language === "javascript") {
    command = `node -e "${code.replace(/"/g, '\\"')}"`;
  } else if (language === "python") {
    command = `python -c "${code.replace(/"/g, '\\"')}"`;
  } else if (language === "cpp") {
    require("fs").writeFileSync("temp.cpp", code);
    command = "g++ temp.cpp -o temp.out && ./temp.out";
  } else {
    return res.json({ output: "Unsupported language." });
  }

  exec(command, (error, stdout, stderr) => {
    if (error) return res.json({ output: stderr || error.message });
    res.json({ output: stdout });
  });
});

app.listen(5004, () => console.log("Execution server running on port 5003"));
