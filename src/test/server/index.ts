if (typeof window === 'undefined') {
  const { server } = require('./server')
  server.listen()
} else {
  const { worker } = require('./browser')
  worker.start({
    onUnhandledRequest(request: any) {
      // Whenever there's an unhandled request which path
      // starts from "/_next", ignore it.
      if (request.url.pathname.startsWith('/_next')) {
        return
      }

      console.warn('Unhandled: %s %s', request.method, request.url.href)
    },
  })
}

export {}
