import Vision
import AppKit
import Foundation

// Token-level OCR dump: prints JSON [{text, x, y, w, h, line}] in image pixel coords.
let path = CommandLine.arguments[1]
guard let img = NSImage(contentsOfFile: path),
      let cg = img.cgImage(forProposedRect: nil, context: nil, hints: nil) else {
    FileHandle.standardError.write("cannot load image\n".data(using: .utf8)!)
    exit(1)
}
let W = CGFloat(cg.width), H = CGFloat(cg.height)
let req = VNRecognizeTextRequest()
req.recognitionLevel = .accurate
req.usesLanguageCorrection = false
let handler = VNImageRequestHandler(cgImage: cg)
try handler.perform([req])

var items: [[String: Any]] = []
for obs in req.results ?? [] {
    guard let cand = obs.topCandidates(1).first else { continue }
    let full = cand.string
    let ns = full as NSString
    var searchLoc = 0
    for tok in full.split(separator: " ") {
        let t = String(tok)
        let r = ns.range(of: t, options: [], range: NSRange(location: searchLoc, length: ns.length - searchLoc))
        guard r.location != NSNotFound, let sr = Range(r, in: full) else { continue }
        searchLoc = r.location + r.length
        guard let box = try? cand.boundingBox(for: sr) else { continue }
        let bb = box.boundingBox
        items.append([
            "text": t,
            "x": Double(bb.minX * W),
            "y": Double((1 - bb.maxY) * H),
            "w": Double(bb.width * W),
            "h": Double(bb.height * H),
            "line": full,
        ])
    }
}
let json = try JSONSerialization.data(withJSONObject: items, options: [.sortedKeys])
print(String(data: json, encoding: .utf8)!)
