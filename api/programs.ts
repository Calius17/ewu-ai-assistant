type Response = {
  status: (code: number) => Response;
  json: (body: unknown) => void;
};

export default function handler(_request: unknown, response: Response) {
  response.status(200).json({
    info: { name: "East West University (EWU)", location: "Aftabnagar, Rampura, Dhaka-1212, Bangladesh" },
    programs: [],
    waivers: [],
    faqs: [],
    grading: [],
  });
}