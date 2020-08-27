module.exports = (err, req, res, next) => {
    if (err.path === '_id') {
          res.status(404).json({
              errors: ['Item not found']
          })
      } else if (err.errors) {
          const errors = [];

      for (key in err.errors) {
              if (err.errors[key].kind === 'Number' && err.errors[key].name === 'CastError') {
                  errors.push(err.errors[key].value + ' is not a number');
              } else {
                  errors.push(err.errors[key].properties.message);
              }
          }
          res.status(400).json({
              errors
      });
      
      } else {
          console.log(err)
          res.status(err.status || 500).json({
              errors: err.message || "Internal Server Error"
          });
      }
  }