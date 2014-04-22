
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.game = function(req, res){
  res.render('game', { title: 'Game' });
};

exports.controller = function(req, res){
  res.render('controller', { title: 'Game' });
};

exports.dashboard = function(req, res){
  res.render('dashboard', { title: 'DashBoard' });
};