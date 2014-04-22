
/*
 * GET home page.
 */

exports.game = function(req, res){
  res.render('game', { title: 'Game' });
};

