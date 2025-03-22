export function Footer() {
    return (
      <footer className="border-t bg-background">
        <div className="container py-6 md:py-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} SheWorks. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="text-sm text-muted-foreground hover:underline"
              >
                Terms
              </a>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:underline"
              >
                Privacy
              </a>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:underline"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    );
  }