const bcrypt = require('bcrypt');

it('should work', async () => {
  let hash = await bcrypt.hash('password', 10);
  console.log(hash);
});