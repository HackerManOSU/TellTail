## Installing PyTorch and TorchVision
To get started with PyTorch and TorchVision, use the following commands:

```bash
pip install torch torchvision
```

- **`torch`**: The PyTorch library, which provides tensors and automatic differentiation.
- **`torchvision`**: A package containing datasets, model architectures, and image transformations for computer vision tasks.

## UPDATE 1/25/26
Here is the full process to get your GPU to run on TensorFlow. 

- **Prerequisites**: Install Anaconda https://www.anaconda.com/

Now run in your terminal:

Create a new Conda environment with Python version 3.10
```bash
conda create -n py310 python=3.10
```
Set up environment
```bash
conda activate py310
```

Install CUDA Toolkit 11.2 and cuDNN library 8.1
```bash
conda install -c conda-forge cudatoolkit=11.2 cudnn=8.1
```

Install NumPy 1.23
```bash
conda install numpy=1.23
```

Install Tensorflow versions below 2.11
```bash
python -m pip install "tensorflow<2.11"
```
Your environment is now configured, and you’re ready to run models with GPU support for parallel processing. 🎉
