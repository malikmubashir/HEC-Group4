<?php
/**
 * Global Apex — Contact Form Handler
 * Sends to: contact@globalapex.net
 * Anti-spam: honeypot field check
 */

header('Content-Type: application/json; charset=UTF-8');
header('X-Content-Type-Options: nosniff');

// Only allow POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed.']);
    exit;
}

// ---- HONEYPOT CHECK (bots fill hidden field) ----
if (!empty($_POST['hp_website'])) {
    // Fake success to confuse bots
    echo json_encode(['success' => true]);
    exit;
}

// ---- NEWSLETTER SUBSCRIBE (lightweight) ----
if (!empty($_POST['type']) && $_POST['type'] === 'newsletter') {
    $newsletter_email = filter_var(trim($_POST['newsletter_email'] ?? ''), FILTER_VALIDATE_EMAIL);
    if (!$newsletter_email) {
        echo json_encode(['success' => false, 'message' => 'Invalid email address.']);
        exit;
    }
    $to      = 'contact@globalapex.net';
    $subject = 'New Newsletter Subscription — Global Apex';
    $body    = "New newsletter subscription request:\n\nEmail: $newsletter_email\n\nIP: " . ($_SERVER['REMOTE_ADDR'] ?? 'unknown') . "\nTime: " . date('Y-m-d H:i:s T');
    $headers = "From: noreply@globalapex.net\r\nContent-Type: text/plain; charset=UTF-8\r\n";
    mail($to, $subject, $body, $headers);
    echo json_encode(['success' => true]);
    exit;
}

// ---- SANITIZE & VALIDATE CONTACT FORM ----
function sanitize_text(string $val): string {
    return htmlspecialchars(strip_tags(trim($val)), ENT_QUOTES, 'UTF-8');
}

$firstName = sanitize_text($_POST['first_name'] ?? '');
$lastName  = sanitize_text($_POST['last_name']  ?? '');
$email     = filter_var(trim($_POST['email'] ?? ''), FILTER_VALIDATE_EMAIL);
$phone     = sanitize_text($_POST['phone']   ?? '');
$company   = sanitize_text($_POST['company'] ?? '');
$service   = sanitize_text($_POST['service'] ?? 'Not specified');
$message   = sanitize_text($_POST['message'] ?? '');

// Required field validation
if (!$firstName || !$lastName || !$email || !$phone || !$company || !$message) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'All required fields must be completed.']);
    exit;
}

// Length limits (prevent abuse)
if (strlen($message) > 5000) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Message is too long. Please keep it under 5000 characters.']);
    exit;
}

// ---- BUILD EMAIL TO TEAM ----
$to      = 'contact@globalapex.net';
$subject = "New Inquiry: $firstName $lastName — $company";

$emailBody = "NEW CONTACT FORM SUBMISSION — GlobalApex.net
" . str_repeat('=', 60) . "

CONTACT DETAILS
Name:     $firstName $lastName
Company:  $company
Email:    $email
Phone:    $phone

SERVICE INTEREST
$service

MESSAGE
$message

" . str_repeat('-', 60) . "
Submitted: " . date('Y-m-d H:i:s T') . "
IP Address: " . ($_SERVER['REMOTE_ADDR'] ?? 'unknown') . "
Page: " . ($_SERVER['HTTP_REFERER'] ?? 'Direct') . "
";

$headers  = "From: noreply@globalapex.net\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

$sent = mail($to, $subject, $emailBody, $headers);

if (!$sent) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'There was a problem sending your message. Please email us directly at contact@globalapex.net'
    ]);
    exit;
}

// ---- AUTO-REPLY TO SENDER ----
$autoSubject = "Thank you for contacting Global Apex, $firstName";
$autoBody    = "Dear $firstName,

Thank you for reaching out to Global Apex. We have received your message and a member of our team will be in touch within one business day.

What happens next:
- A senior Global Apex consultant will review your inquiry
- We'll reach out to schedule a brief introductory call
- The initial consultation is completely free and without obligation

In the meantime, you might find the following helpful:
- Our Services: https://www.globalapex.net/services.html
- Case Studies: https://www.globalapex.net/case-studies.html
- Latest Insights: https://www.globalapex.net/insights.html

If you have an urgent matter, please call us directly at +33 6 42610725.

Best regards,

The Global Apex Team
" . str_repeat('-', 60) . "
Global Apex SAS
4 Boulevard du Château, 78280 Guyancourt, France
Tel: +33 6 42610725 | Email: contact@globalapex.net
Website: https://www.globalapex.net
";

$autoHeaders  = "From: Global Apex <contact@globalapex.net>\r\n";
$autoHeaders .= "Reply-To: contact@globalapex.net\r\n";
$autoHeaders .= "MIME-Version: 1.0\r\n";
$autoHeaders .= "Content-Type: text/plain; charset=UTF-8\r\n";

mail($email, $autoSubject, $autoBody, $autoHeaders);

// ---- SUCCESS RESPONSE ----
echo json_encode([
    'success' => true,
    'message' => 'Thank you! Your message has been sent. We will be in touch within one business day.'
]);
