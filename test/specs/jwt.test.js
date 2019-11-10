const jwt = require('jsonwebtoken');

const SECRET = '123xyz';

it('should work', () => {
  let token = jwt.sign({
      email: 'asdf@asdf.com'
    }, SECRET, {
      subject: 'asdf'
    });
  let decoded = jwt.decode(token, SECRET);
  let test = jwt.verify(token, SECRET, { subject: 'asdf' });
  expect(test).toBeTruthy();
});