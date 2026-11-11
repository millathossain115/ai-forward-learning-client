export interface ComplexityDetail {
  operation: string;
  bestCase: string;
  worstCase: string;
  averageCase: string;
  reason: string;
}

export const ARRAY_THEORY = {
  title: "Array: Contiguous Memory & Fixed-Offset Indexing",
  definition:
    "An Array is a fundamental linear data structure that stores elements of identical type in contiguous (adjacent) physical memory locations. Because memory is contiguous, the physical memory address of any element can be computed in strictly O(1) constant time using pointer arithmetic.",
  memoryFormula: "Address(A[i]) = BaseAddress + (i × ElementSizeInBytes)",
  
  realWorldApplications: [
    {
      domain: "AI & LLM Embeddings",
      title: "Dense High-Dimensional Vectors",
      description:
        "Every text chunk in RAG is represented as a dense array of 32-bit floats (e.g. 1,536 dimensions for OpenAI or 768 for Gemini). Cosine similarity and dot product operate by iterating contiguous array buffers in SIMD/GPU memory.",
    },
    {
      domain: "Transformer Architecture",
      title: "Token Sequence Buffers",
      description:
        "Input prompts are tokenized into integer arrays (e.g. [15496, 11, 703, 318]). The Attention mechanism computes Q, K, V matrices over contiguous row-major arrays where index corresponds to token position.",
    },
    {
      domain: "Operating Systems & Hardware",
      title: "Cache Line Spatial Locality",
      description:
        "Modern CPUs load memory in 64-byte cache lines. Traversing an array sequentially triggers CPU hardware pre-fetchers, resulting in near-zero cache misses compared to pointer-chasing structures like linked lists.",
    },
    {
      domain: "Computer Vision & Audio",
      title: "Pixel Grids & Signal Buffers",
      description:
        "Images (Height × Width × Channels) and audio spectrograms are stored as contiguous 1D/2D flat arrays where indexing (y * width + x) translates directly to a pixel offset.",
    },
  ],

  complexities: [
    {
      operation: "Access by Index (A[i])",
      bestCase: "O(1)",
      worstCase: "O(1)",
      averageCase: "O(1)",
      reason: "Direct memory address calculation: Base + i * 4 bytes. Zero search required.",
    },
    {
      operation: "Search by Value (Linear)",
      bestCase: "O(1)",
      worstCase: "O(N)",
      averageCase: "O(N)",
      reason: "Best if element is at index 0. Worst if element is at the very end or absent.",
    },
    {
      operation: "Insertion at End (push)",
      bestCase: "O(1)",
      worstCase: "O(N)",
      averageCase: "O(1) amortized",
      reason: "O(1) if buffer has capacity. O(N) when dynamic array doubles capacity and copies all items.",
    },
    {
      operation: "Insertion at Index k",
      bestCase: "O(1)",
      worstCase: "O(N)",
      averageCase: "O(N)",
      reason: "Requires shifting (N - k) elements to the right to open a slot at index k.",
    },
    {
      operation: "Deletion at Index k",
      bestCase: "O(1)",
      worstCase: "O(N)",
      averageCase: "O(N)",
      reason: "Requires shifting (N - k - 1) elements to the left to close the gap.",
    },
  ] as ComplexityDetail[],
};

