import { PythonShell } from "python-shell";

const bypass = async (captchas, token) => {
  console.log('initiating bypass');
  return new Promise((resolve, reject) => {
    let options = {
      args: [captchas[0].sitekey],
      scriptPath: path.resolve('bypass')
    };
    PythonShell.run(
      `bypass.py`,
      options,
      async (err, [, captchaKey]) => {
        if (err) throw err;
        let solutions = [
          {
            _vendor: captchas[0]._vendor,
            id: captchas[0].id,
            text: captchaKey,
            hasSolution: true,
          },
        ];
        console.log(`solved`);
        resolve({ solutions: solutions });
      }
    );
  });
};
export default bypass;
