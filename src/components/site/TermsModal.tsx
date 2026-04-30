import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export function TermsModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">Terms & Conditions</DialogTitle>
        </DialogHeader>
        <div className="prose prose-sm max-w-none text-foreground/85 space-y-4">
          <p>Welcome to RUSIN. By using our services you agree to the following terms.</p>
          <h4 className="font-display text-lg">1. Bookings</h4>
          <p>All tour bookings require a 25% non-refundable deposit. Final payment is due 30 days prior to departure.</p>
          <h4 className="font-display text-lg">2. Cancellations</h4>
          <p>Cancellations more than 30 days before departure are eligible for a refund of all amounts paid less the deposit.</p>
          <h4 className="font-display text-lg">3. Education Services</h4>
          <p>Admission consultancy fees are non-refundable once an application has been formally submitted to a partner university.</p>
          <h4 className="font-display text-lg">4. Liability</h4>
          <p>RUSIN acts as an intermediary with hotels, airlines, universities and partners and is not liable for force majeure events.</p>
          <h4 className="font-display text-lg">5. Privacy</h4>
          <p>Personal information is processed in accordance with applicable data protection laws and never sold to third parties.</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
