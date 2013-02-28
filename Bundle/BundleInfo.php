<?php
namespace Arnm\CoreBundle\Bundle;
/**
 * This is a base abstract implementation of a bundle info interface
 *
 * @author Alex Agulyansky <alex@iibspro.com>
 */
abstract class BundleInfo implements BundleInfoInterface
{

	/**
	 * @var string
	 */
	private $key;
    /**
     * Constructor
     *
     * @param string                       $key       Key under with this info object will be identified
     * @param BundleInfoCollectorInterface $collector Collector object
     */
    public function __construct($key, BundleInfoCollectorInterface $collector)
    {
    	$this->setKey($key);
        $collector->register($this);
    }

    /**
     * Sets the key value
     *
     * @param string $key
     */
    public function setKey($key)
    {
		$this->key = (string) $key;
    }

    /**
     * {@inheritdoc}
     * @see Arnm\CoreBundle\Bundle.BundleInfoInterface::getKey()
     */
    public function getKey()
    {
    	return $this->key;
    }
}
