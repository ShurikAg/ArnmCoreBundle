<?php
namespace Arnm\CoreBundle\Entity;

use Symfony\Component\Serializer\Normalizer\NormalizerInterface;
use Symfony\Component\Serializer\Normalizer\NormalizableInterface;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Serializer\Normalizer\CustomNormalizer;
use Symfony\Component\Serializer\Encoder\XmlEncoder;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
/**
 * Abstract method for entity object type
 *
 * @author Alex Agulyansky <alex@iibspro.com>
 */
abstract class Entity implements \ArrayAccess, NormalizableInterface
{
    /**
     * Hydrates the object to json
     *
     * @return string
     */
    public function toJson()
    {
        return $this->encodeTo('json');
    }
    /**
     * Hydrates the object to xml
     *
     * @return string
     */
    public function toXml()
    {
        return $this->encodeTo('xml');
    }

    /**
     * Converts the entity to array
     *
     * @return array
     */
    public function toArray()
    {
        return $this->encodeTo('array');
    }

    /**
     * Encodes the object into different formats
     *
     * @param string $format
     *
     * @return string
     */
    protected function encodeTo($format = 'xml')
    {
        $serializer = new Serializer(array(
            new CustomNormalizer()
        ), array(
            'xml' => new XmlEncoder(),
            'json' => new JsonEncoder()
        ));

        if ($format == 'array') {
            return $serializer->normalize($this);
        }

        return $serializer->encode($this, $format);
    }

    //FIXME: Refator this shit out into separate class
    /**
     * {@inheritdoc}
     * @see Symfony\Component\Serializer\Normalizer.NormalizableInterface::normalize()
     */
    public function normalize(NormalizerInterface $normalizer, $format = null)
    {
        $reflectionObject = new \ReflectionObject($this);
        $reflectionMethods = $reflectionObject->getMethods(\ReflectionMethod::IS_PUBLIC);

        $data = array();
        foreach ($reflectionMethods as $method) {
            if ($this->isGetMethod($method)) {
                $name = strtolower(substr($method->getName(), 3));
                if (! $reflectionObject->hasProperty($name)) {
                    continue;
                }

                $value = $method->invoke($this);
                if (! is_scalar($value) && $value instanceof Entity) {
                    $value = $value->normalize($normalizer, $format);
                }

                $data[$name] = $value;
            }
        }

        return $data;
    }

    /**
     * Checks if a method's name is get.* and can be called without parameters.
     *
     * @param ReflectionMethod $method the method to check
     *
     * @return Boolean whether the method is a getter.
     */
    private function isGetMethod(\ReflectionMethod $method)
    {
        return (0 === strpos($method->getName(), 'get') && 3 < strlen($method->getName()) && 0 === $method->getNumberOfRequiredParameters());
    }

    /**
     * {@inheritdoc}
     * @see ArrayAccess::offsetExists()
     */
    public function offsetExists($offset)
    {
        return isset($this->$offset);
    }

    /**
     * {@inheritdoc}
     * @see ArrayAccess::offsetSet()
     */
    public function offsetSet($offset, $value)
    {
        $this->$offset = $value;
    }

    /**
     * {@inheritdoc}
     * @see ArrayAccess::offsetGet()
     */
    public function offsetGet($offset)
    {
        return $this->$offset;
    }

    /**
     * {@inheritdoc}
     * @see ArrayAccess::offsetUnset()
     */
    public function offsetUnset($offset)
    {
        $this->$offset = null;
    }
}