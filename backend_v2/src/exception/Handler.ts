import Locals from '../providers/Locals';

class Handler {
  /**
   * Show undermaintenance page incase of errors
   */
  public static errorHandler(err: any, req: any, res: any, next: any) {
    // Log.error(err.stack);
    res.status(500).send('Internal server error');

    if (req.originalUrl.includes('/api/')) {
      if (err.name && err.name === 'UnauthorizedError') {
        const innerMessage =
          err.inner && err.inner.message ? err.inner.message : undefined;
        return res.json({
          error: ['Invalid Token!', innerMessage],
        });
      }

      return res.json({
        error: err,
      });
    }

    return res.render('pages/error', {
      error: err.stack,
      title: 'Under Maintenance',
    });
  }
}

export default Handler;
